echo "==== Building Diagrams ===="
for f in *.puml
do
    dirPre="../../bin/diagrams"
    name=$(basename $f | cut -f 1 -d '.')
    buildFile="$dirPre/$name.png"
    if [ ! -f $buildFile ] || [ $f -nt $buildFile ]; then
	echo "building $name"
        java -jar ~/.emacs.d/tools/plantuml/plantuml.jar "$f" -o "$dirPre"
    else
	echo "skipping $name"
    fi
done
