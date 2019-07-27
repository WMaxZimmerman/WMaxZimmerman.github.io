echo "==== Building Presentations ===="
for f in *.org
do
    name=$(basename $f | cut -f 1 -d '.')
    buildFile="../../bin/presentations/$name.html"
    if [ ! -f $buildFile ] || [ $f -nt $buildFile ]; then
	echo "building $name"
        pandoc -s $f -c "reveal.js/css/theme/moon.css" -t revealjs -o $buildFile -V "revealjs-url=https://revealjs.com"
    else
	echo "skipping $name"
    fi
done
