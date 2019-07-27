function buildDirectory {
    pushd $1 > /dev/null
    ./build.sh
    popd > /dev/null
    echo ""
}

buildDirectory "presentations"
buildDirectory "diagrams"
