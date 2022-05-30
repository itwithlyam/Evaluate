echo -e "\033[0;31mRunning npm\033[0m"
npm start
echo -e "\033[0;31mOutput\033[0m"
./output.out
echo -e "\033[0;31mHexdump\033[0m"
hexdump -C output.out
echo -e "\033[0;31mELF Stats\033[0m"
readelf -a output.out