echo "==== Building Diagrams ===="
buildDir="../../WMaxZimmerman.Site.DAL/resources/diagrams"
mkdir -p $buildDir

for f in *.puml
do
    name=$(basename $f | cut -f 1 -d '.')
    buildFile="$buildDir/$name.png"
    if [ ! -f $buildFile ] || [ $f -nt $buildFile ]; then
	echo "building $name"
	java -jar ~/.emacs.d/tools/plantuml/plantuml.jar "$f" -o "$buildDir"
    else
	echo "skipping $name"
    fi
done

buildDir="../../WMaxZimmerman.Site.DAL/WMaxZimmerman.Site.DAL.csproj"
echo "  <ItemGroup>" >> $buildDir
for f in *.puml
do
    name=$(basename $f | cut -f 1 -d '.')
    echo "    <None Remove=\"resources\\diagrams\\$name.png\" />" >> $buildDir
done
echo "  </ItemGroup>" >> $buildDir

echo "" >> $buildDir
echo "  <ItemGroup>" >> $buildDir
for f in *.puml
do
    name=$(basename $f | cut -f 1 -d '.')
    echo "    <EmbeddedResource Include=\"resources\\diagrams\\$name.png\">" >> $buildDir
    echo "      <CopyToOutputDirectory>Always</CopyToOutputDirectory>" >> $buildDir
    echo "    </EmbeddedResource>" >> $buildDir
done
echo "  </ItemGroup>" >> $buildDir
echo "" >> $buildDir
