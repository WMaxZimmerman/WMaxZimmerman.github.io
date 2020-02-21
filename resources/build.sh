function buildDirectory {
    pushd $1 > /dev/null
    ./build.sh
    popd > /dev/null
    echo ""
}

echo "==== Building Embedded Resources ===="
csprojFile="../WMaxZimmerman.Site.DAL/WMaxZimmerman.Site.DAL.csproj"

echo "" > $csprojFile
echo "<Project Sdk=\"Microsoft.NET.Sdk\">" >> $csprojFile
echo "" >> $csprojFile

buildDirectory "blogs"
buildDirectory "presentations"
buildDirectory "diagrams"

echo "" >> $csprojFile
echo "  <ItemGroup>" >> $csprojFile
echo "    <ProjectReference Include=\"..\\WMaxZimmerman.Site.Shared\\WMaxZimmerman.Site.Shared.csproj\" />" >> $csprojFile
echo "  </ItemGroup>" >> $csprojFile
echo "" >> $csprojFile
echo "  <PropertyGroup>" >> $csprojFile
echo "    <TargetFramework>netstandard2.0</TargetFramework>" >> $csprojFile
echo "  </PropertyGroup>" >> $csprojFile
echo "" >> $csprojFile
echo "</Project>" >> $csprojFile


