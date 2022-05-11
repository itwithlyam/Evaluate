The ASCII preprocessor module converts ASCII strings to integers and integers to ASCII strings so they can be printed out.

bss.asm: Reservations required to be put into BSS
labels.asm: Labels required to be put into TEXT

To use -

Move the string to convert into RBX (it is an integer so should not go above 64 bits)
Reset ECX
Call ConvertToNum or ConvertFromNum
Find the output in Result or ResultB for ConvertToNum and ConvertFromNum respectively

