echo "==== Building Articles ===="
mkdir -p ../../articles

for f in *.org
do
    name=$(basename $f | cut -f 1 -d '.')
    buildFile="../../articles/$name.html"
    if [ ! -f $buildFile ] || [ $f -nt $buildFile ]; then
	echo "building $name"

	cp $f $name-temp.org

	sed -i 's/:blog://g' $name-temp.org
	sed -i 's/:slideshow:/:noexport:/g' $name-temp.org
	
        pandoc -s $name-temp.org -c "../main.css" -t html5 -o $buildFile --highlight-style=haddock
	
	rm $name-temp.org
    else
	echo "skipping $name"
    fi
done

echo "==== Building Presentations ===="
mkdir -p ../../presentations

for f in *.org
do
    name=$(basename $f | cut -f 1 -d '.')
    buildFile="../../presentations/$name.html"
    if [ ! -f $buildFile ] || [ $f -nt $buildFile ]; then
	echo "building $name"

	cp $f $name-temp.org

	sed -i 's/:slideshow://g' $name-temp.org
	sed -i 's/:blog:/:noexport:/g' $name-temp.org
	
        pandoc -s $name-temp.org -c "reveal.js/css/theme/moon.css" -t revealjs -o $buildFile -V "revealjs-url=https://revealjs.com" --slide-level 2

	rm $name-temp.org
    else
	echo "skipping $name"
    fi
done
