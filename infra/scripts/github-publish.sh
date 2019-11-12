targetDir=$1

cd $targetDir/WMaxZimmerman.Site.UI/dist
git init
git checkout -b master
git add -A
git commit -m "Create build"
git push -f git@github.com:WMaxZimmerman/WMaxZimmerman.github.io.git master
