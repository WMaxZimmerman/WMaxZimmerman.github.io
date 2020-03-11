targetDir=$1

cd site
dotnet build
dotnet publish --configuration Release --output $targetDir
