echo "==== Building Presentations ===="
for f in *.org
do
    name=$(basename $f | cut -f 1 -d '.')
    buildFile="../../bin/presentations/$name.html"
    if [ ! -f $buildFile ] || [ $f -nt $buildFile ]; then
	echo "building $name"
        pandoc $f  -t revealjs -s -o $buildFile
    else
	echo "skipping $name"
    fi
done
