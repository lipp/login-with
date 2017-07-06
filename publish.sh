#!/usr/bin/env sh
np
if [ $? -eq 0 ]
then
	version=$(git describe --abbrev=0 --tags | cut -c2-)
	tag=lipp/login-with:$version
	docker build -t $tag . && docker push $tag
else
	exit
fi
