
        BITS 64

        section .text

            global _start
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

            strrlabel:
                db "Hello",0

strrlen: equ 5
strrloop: 
                mov al, [ebx]

                or al,al

                jz StrEnd


                cmp al,0

                je StrEnd


                add [strr+ecx], al


                inc ebx

                inc ecx

                jmp strrloop

              
strprintf4: db 10,0
strprintflen4: equ $-strprintf4
ToConvert: db "1234567890",0
len: equ 1000

            StrEnd: ret

            _start:
								mov rbx, ToConvert
								mov ecx,0
								call ConvertToNum
                                mov byte [Result+ecx],0

                mov ebx, strrlabel

                mov ecx, 0

                call strrloop

              

mov eax,4
mov ebx,1
mov ecx,strr
mov edx,strrlen
int 0x80


mov eax,4
mov ebx,1
mov ecx,strprintf4
mov edx,strprintflen4
int 0x80

mov rbx, Result
mov ecx,0
call ConvertFromNum


mov eax,4
mov ebx,1
mov ecx,ResultB
mov ebx,len
int 0x80

mov eax,4
mov ebx,1
mov ecx,strprintf4
mov edx,strprintflen4
int 0x80



                jmp end

            end:
                mov eax,1
mov ebx,0
                int 0x80

        

        section .bss
strr resb 5
printing resb 10
Result resb 1000
ResultB resb 1000