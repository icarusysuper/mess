#!/bin/sh
pid=`ps -ef |grep 'node' |grep 'mustang' |sed -r 's/ +/ /g' |cut -f2 -d' '`
kill $pid
sleep 1
ulimit -n 99999
sleep 1

mv node.log $HOME/node_mustang_`date +%Y%m%d%H%M`.log
touch node.log
sleep 1

file=`pwd`/server.js
echo $file
NODE_ENV=development node $file &>node.log&

ulimit -n
