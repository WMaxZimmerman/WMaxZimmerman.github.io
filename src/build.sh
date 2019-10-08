function buildDirectory {
    pushd $1 > /dev/null
    ./build.sh
    popd > /dev/null
    echo ""
}

echo "==== Building Index ===="

echo "#+TITLE: W Max Zimmerman" > index.org
echo "" >> index.org
echo "* Blogs" >> index.org
echo "A collection of presentations I have and/or would like to give" >> index.org

for f in articles/*.org
do
    name=$(basename $f | cut -f 1 -d '.')
    if [ "$name" != "*" ]
    then
	x="$(echo $name | sed 's/-/ /g')"
	x="$(echo $x | sed 's/_/: /g')"
	echo "- [[file:articles/$name.html][$x]]([[file:presentations/$name.html][slideshow]])" >> index.org
    fi
    
done


pandoc -s index.org -c main.css -o ../index.html

buildDirectory "articles"
buildDirectory "diagrams"
