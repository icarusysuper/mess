#!/bin/sh
if [ x$1 = x ]
then 
    echo 'app name required'
    exit -1
else
    pid=`ps -ef |grep node |grep $1 |grep -v grep |sed -r 's/ +/ /g' |cut -f2 -d' '`
fi

if [ x$2 = x-d ]
then 
    start_env=development
else
    start_env=production
fi

rootpath=${0/%run.sh/''}
log_path=$rootpath'apps'/$1/'node.'$1'.log'
log_path_bak=/home/$1_logs/node.$1.`date +%Y-%m-%d_%H:%M:%S`.log

echo 'exised pid: '$pid
echo 'start env: '$start_env

kill $pid
sleep 1
ulimit -n 99999
sleep 1


mv $log_path $log_path_bak
touch $log_path
sleep 1

app=$rootpath'apps'/$1/app.js
NODE_ENV=$start_env node $app &>$log_path&

ulimit -n