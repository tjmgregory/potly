#!/bin/bash

PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
CURR_DUR=$(pwd)

build() {
	GO111MODULE=on
    GOOS=linux

    for function_path in $PROJECT_DIR/functions/* ; do
        if [ -d "$function_path" ]; then
            echo $function_path
            function_name=`echo $function_path | sed 's/^.*functions\///g'`
            echo $function_name
            cd $function_path
            go build -ldflags='-s -w' -o $PROJECT_DIR/bin/$function_name main.go
        fi
    done

    cd $CURR_DUR
}

"$@"
