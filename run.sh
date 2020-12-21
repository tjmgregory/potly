#!/bin/bash

PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
CURR_DUR=$(pwd)

build() {
	for function_path in $PROJECT_DIR/functions/* ; do
        if [ -d "$function_path" ]; then
            echo "Building from $function_path"
            function_name=`echo $function_path | sed 's/^.*functions\///g'`
            cd $function_path
            GO111MODULE=on GOOS=linux go build -ldflags='-s -w' -o $PROJECT_DIR/bin/$function_name main.go
            echo "Built: $function_name"
        fi
    done

    cd $CURR_DUR
}

test() {
	for function_path in $PROJECT_DIR/functions/* ; do
        if [ -d "$function_path" ]; then
            echo "Testing in $function_path"
            cd $function_path
            go test ./...
        fi
    done

	for package_path in $PROJECT_DIR/packages/* ; do
        if [ -d "$package_path" ]; then
            echo "Testing in $package_path"
            cd $package_path
            go test ./...
        fi
    done

    cd $CURR_DUR
}

"$@"
