import {writeFileSync} from 'fs';

export default function Generator(AST, code, output) {
    let simplification = `
        #include <vector>
        #include <cstdint>
        #include <iostream>
        #include <algorithm>
        
        typedef std::int32_t value;
        
        struct power {
            char variable;
            value degree;
        };
        
        struct monomial {
            value coefficient;
            std::vector< power > product;
        };
        
        struct polynomial {
            std::vector< monomial > sum;
        };

        std::istream & operator >> ( std::istream & is, power & obj ) {
            // Skip leading space.
            std::istream::sentry s( is );

            // Read one character for the variable name.
            // Require that it be a letter.
            if ( is && std::isalpha( is.peek() ) ) {
                is >> obj.variable;
            } else {
                // Otherwise, the input is invalid.
                is.clear( std::ios::failbit );
            }

            // Read the exponent if its presence is indicated by a ^.
            if ( is ) {
                if ( is.peek() == '^' ) {
                    is.ignore();
                    is >> obj.degree;
                } else {
                    obj.degree = 1;
                    is.clear();
                }
            }
            return is;
        }

        std::ostream & operator << ( std::ostream & os, power const & obj ) {
            os << obj.variable;
            if ( obj.degree != 1 ) {
                os << '^' << obj.degree;
            }
            return os;
        }

        std::istream & operator >> ( std::istream & is, monomial & obj ) {
            obj.coefficient = 1;
            obj.product.clear();

            // Read a sequence of numbers and exponentiated variables,
            // optionally separated by * .
            bool did_read_asterisk = false;

            do {
                // Try reading a coefficient. (And ignore leading space.)
                value coefficient;
                if ( is >> coefficient ) {
                    obj.coefficient *= coefficient;
                } else if ( is.rdstate() & std::ios::failbit ) {
                    // If it was absent, tell iostream to resume input.
                    is.clear( is.rdstate() & ~ std::ios::failbit );

                    // Read a power instead.
                    power p;
                    if ( is >> p ) {
                        obj.product.push_back( p );
                    }

                    // It's OK if the power was missing too, unless there was a * .
                    if ( ! did_read_asterisk && ( is.rdstate() & std::ios::failbit ) ) {
                        is.clear( is.rdstate() & ~ std::ios::failbit );
                        return is;
                    }
                }
                did_read_asterisk = false;

                // Skip trailing space.
                if ( is >> std::ws ) {
                    if ( is.eof() ) {
                        // Succeed if this is the end of input.
                        return is;
                    }
                    if ( is.peek() == '*' ) {
                        is.ignore();
                        did_read_asterisk = true;
                    }
                    if ( is.peek() == '+' || is.peek() == '-' ) {
                        break;
                    }
                }
            } while ( is );

            return is;
        }

        std::ostream & operator << ( std::ostream & os, monomial const & obj ) {
            if ( obj.coefficient != 1 || obj.product.empty() ) {
                os << obj.coefficient;
            }
            for ( power const & p : obj.product ) {
                os << p;
            }
            return os;
        }

        std::istream & operator >> ( std::istream & is, polynomial & obj ) {
            // Skip leading space and reject EOF.
            std::istream::sentry s( is );

            // If there is no minus sign, start positive.
            bool positive = true;
            if ( is && is.peek() == '-' ) {
                is.ignore();
                positive = false;
            }

            // Read a sequence of monomials separated by + or - signs.
            monomial m;
            while ( is >> m ) {
                if ( ! positive ) m.coefficient = - m.coefficient;
                obj.sum.push_back( m );

                is >> std::ws;
                char next_op = is.peek();
                if ( is && ( next_op == '+' || next_op == '-' ) ) {
                    is.ignore();
                    positive = next_op == '+';

                } else if ( ! is.bad() ) {
                    // Succeed if the next operator is missing.
                    is.clear();
                    return is;
                }
            }
            return is;
        }

        std::ostream & operator << ( std::ostream & os, polynomial const & obj ) {
            bool skip_leading_plus = true;

            for ( monomial const & m : obj.sum ) {
                if ( m.coefficient > 0 && ! skip_leading_plus ) {
                    os << '+';
                }
                os << m;
                skip_leading_plus = false;
            }
            return os;
        }

        struct variable_order {
            bool operator() ( power lhs, power rhs ) {
                return lhs.variable < rhs.variable;
            }
        };
        struct variable_same {
            bool operator() ( power lhs, power rhs ) {
                return lhs.variable == rhs.variable;
            }
        };
        
        monomial simplify( monomial in ) {
            std::sort( in.product.begin(), in.product.end(), variable_order{} );
            for ( auto it = in.product.begin();
                ( it = std::adjacent_find( it, in.product.end(), variable_same{} ) )
                     != in.product.end(); ) {
                value degree = it->degree;
                it = in.product.erase( it );
                it->degree += degree;
            }
            in.product.erase( std::remove_if( in.product.begin(), in.product.end(),
                []( power p ) { return p.degree == 0; } ), in.product.end() );
            return in;
        }
        
        struct power_order {
            bool operator() ( power lhs, power rhs ) {
                return lhs.variable < rhs.variable? true
                     : lhs.variable > rhs.variable? false
                     : lhs.degree < rhs.degree;
            }
        };
        struct power_same {
            bool operator() ( power lhs, power rhs ) {
                return lhs.variable == rhs.variable
                    && lhs.degree == rhs.degree;
            }
        };
        
        struct product_order {
            bool operator() ( monomial lhs, monomial rhs ) {
                return std::lexicographical_compare( lhs.product.begin(), lhs.product.end(),
                                                     rhs.product.begin(), rhs.product.end(),
                                                     power_order{} );
            }
        };
        struct product_same {
            bool operator() ( monomial lhs, monomial rhs ) {
                return std::equal( lhs.product.begin(), lhs.product.end(),
                                   rhs.product.begin(), rhs.product.end(),
                                   power_same{} );
            }
        };
        
        polynomial simplify( polynomial in ) {
            for ( auto & m : in.sum ) {
                m = simplify( m );
            }
            std::sort( in.sum.begin(), in.sum.end(), product_order{} );
            for ( auto it = in.sum.begin();
                ( it = std::adjacent_find( it, in.sum.end(), product_same{} ) )
                     != in.sum.end(); ) {
                value coefficient = it->coefficient;
                it = in.sum.erase( it );
                it->coefficient += coefficient;
            }
            in.sum.erase( std::remove_if( in.sum.begin(), in.sum.end(),
                []( monomial m ) { return m.coefficient == 0; } ), in.sum.end() );
        
            // Represent zero rather than "nothing."
            if ( in.sum.empty() ) in = polynomial{{ monomial{ 0, {} } }};
        
            return in;
        }
    `

    let c = `
        #include <cstdio>

        ${simplification}

        int main() {
            ${code.join('\n')}
        }
    `

    writeFileSync(output+".cpp", " ");
    writeFileSync(output+".cpp", c);
}