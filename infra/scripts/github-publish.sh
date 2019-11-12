targetDir=$1

pushd $targetDir
git init
git checkout -b gh-pages
git add -A
git commit -m "Create build"
git push -f git@github.com:WMaxZimmerman/WMaxZimmerman.github.io.git gh-pages

popd
rm -rf $targetDir
