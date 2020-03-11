echo "==== Building Blogs ===="
buildDir="../../WMaxZimmerman.Site.DAL/resources/misc"
mkdir -p $buildDir

for f in *.org
do
    name=$(basename $f | cut -f 1 -d '.')
    buildFile="$buildDir/$name.html"
    if [ ! -f $buildFile ] || [ $f -nt $buildFile ]; then
	echo "building $name"

	cp $f $name-temp.org

	sed -i 's/:slideshow:/:noexport:/g' $name-temp.org
	sed -i 's/:blog://g' $name-temp.org
	
        pandoc $name-temp.org -o $buildFile

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
    echo "    <None Remove=\"resources\\misc\\$name.html\" />" >> $buildDir
done
echo "  </ItemGroup>" >> $buildDir

echo "" >> $buildDir
echo "  <ItemGroup>" >> $buildDir
for f in *.org
do
    name=$(basename $f | cut -f 1 -d '.')
    echo "    <EmbeddedResource Include=\"resources\\misc\\$name.html\">" >> $buildDir
    echo "      <CopyToOutputDirectory>Always</CopyToOutputDirectory>" >> $buildDir
    echo "    </EmbeddedResource>" >> $buildDir
done
echo "  </ItemGroup>" >> $buildDir
echo "" >> $buildDir
