
        BITS 64

        section .text

            global _start

						ConvertToNum: 
							mov al,[rbx]

							cmp al,0
							je StrEnd

              or al,al
              jz StrEnd

							add al,48
							mov [Result+ecx],al

							inc ecx
                            inc rbx
							jmp ConvertToNum

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
ToConvert: db "123 4567890",0
len: equ 1000

            StrEnd: ret

            _start:
								mov rbx, ToConvert
								mov ecx,0
								call ConvertToNum

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

mov eax,4
mov ebx,1
mov ecx,Result
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
Result resb 1000
    