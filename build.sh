echo "==== Building Index ===="

pandoc -s index.org -c main.css -o index.html

pushd src > /dev/null
./build.sh
popd > /dev/null
echo ""
