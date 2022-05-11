
        BITS 64

        section .text

            ConversionCheck:
                            cmp al,0
                            jng StrEnd

                            cmp al,57
                            jg StrError

                            ret

						ConvertToNum: 
							mov al,[rbx]

							cmp al,0
							je StrEnd

                            or al,al
                            jz StrEnd

							sub al,48
                            call ConversionCheck
							mov [Result+ecx],al

							inc ecx
                            inc rbx
							jmp ConvertToNum

                        ConvertFromNum: 
							mov al,[rbx]

                            cmp al,0
							je StrEnd

                            or al,al
                            jz StrEnd

							add al,48
                            call ConversionCheck
							mov [ResultB+ecx],al

							inc ecx
                            inc rbx
							jmp ConvertFromNum

                        StrErrorStr: db "Fatal error (evaluate): An error occured while performing ASCII operations.",10,0
                        StrErrorLen: equ $-StrErrorStr
                        StrError: 
                            mov eax,4
                            mov ebx,1
                            mov ecx,StrErrorStr
                            mov edx,StrErrorLen
                            int 0x80

                            jmp end

        

        section .bss
Result resb 1000
ResultB resb 1000