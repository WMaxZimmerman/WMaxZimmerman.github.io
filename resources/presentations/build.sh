echo "==== Building Presentations ===="
buildDir="../../WMaxZimmerman.Site.DAL/resources/presentations"
mkdir -p $buildDir

for f in *.org
do
    name=$(basename $f | cut -f 1 -d '.')
    buildFile="$buildDir/$name.html"
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

buildDir="../../WMaxZimmerman.Site.DAL/WMaxZimmerman.Site.DAL.csproj"
echo "  <ItemGroup>" >> $buildDir
for f in *.org
do
    name=$(basename $f | cut -f 1 -d '.')
    echo "    <None Remove=\"resources\\presentations\\$name.html\" />" >> $buildDir
done
echo "  </ItemGroup>" >> $buildDir

echo "" >> $buildDir
echo "  <ItemGroup>" >> $buildDir
for f in *.org
do
    name=$(basename $f | cut -f 1 -d '.')
    echo "    <EmbeddedResource Include=\"resources\\presentations\\$name.html\">" >> $buildDir
    echo "      <CopyToOutputDirectory>Always</CopyToOutputDirectory>" >> $buildDir
    echo "    </EmbeddedResource>" >> $buildDir
done
echo "  </ItemGroup>" >> $buildDir
echo "" >> $buildDir
