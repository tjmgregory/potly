#!/bin/bash

# Go modules can only be locally linked using absolute paths.
# Thus we must peform and build/test steps within each directory iteratively.

PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
CURR_DUR=$(pwd)

build() {
    for function_path in $PROJECT_DIR/functions/* ; do
        if [ -d "$function_path" ]; then
            echo "Building from $function_path"
            function_name=`echo $function_path | sed 's/^.*functions\///g'`
            cd $function_path
            GO111MODULE=on GOOS=linux go build -ldflags='-s -w' -o $PROJECT_DIR/bin/$function_name
            echo "Built: $function_name"
        fi
    done

    cd $CURR_DUR
}

DIRS_WITH_TESTS=("functions" "packages")

test() {
    failures=0

    for dir_with_tests in "${DIRS_WITH_TESTS[@]}"; do
        for path in $PROJECT_DIR/$dir_with_tests/* ; do
            if [ -d "$path" ]; then
                echo "Testing in $path"
                cd $path
                go test ./...
                ((failures+=$?))
            fi
        done
    done

    cd $CURR_DUR

    if [ $failures -ne 0 ]; then
        exit 1
    fi
}

"$@"
