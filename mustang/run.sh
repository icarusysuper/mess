#!/bin/sh
pid=`ps -ef |grep 'node' |grep 'mustang' |sed -r 's/ +/ /g' |cut -f2 -d' '`
kill $pid
sleep 1
ulimit -n 99999
sleep 1

ADDR=`dirname $0`

mv $ADDR/node.log $HOME/node_mustang_`date +%Y%m%d%H%M`.log
touch $ADDR/node.log
sleep 1

main=$ADDR/server.js
log=$ADDR/node.log
echo $main
NODE_ENV=development node $main &>$log&

ulimit -n
