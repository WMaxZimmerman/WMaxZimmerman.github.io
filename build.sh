echo "==== Building Index ===="

pandoc index.org  -t html -s -o index.html

pushd src > /dev/null
./build.sh
popd > /dev/null
echo ""
