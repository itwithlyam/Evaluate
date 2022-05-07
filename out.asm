
        BITS 64
        extern printf

        section .text

            global main

            StrEnd: ret

            fmt: db '%d', 10, 0

            main:
        mov bl,1
        mov al,1
        and al,bl

        mov [ands],al
        
        push rdp

        mov rdi,fmt
        mov rsi,al
        mov rax,0
        call printf

        pop rbp



                jmp end

            end:
                mov eax,1
                int 0x80

        section .data
        ands db 1

        

        
    