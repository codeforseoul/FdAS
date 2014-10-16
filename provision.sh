#!/bin/bash

# Housekeeping
sudo sed -i 's/archive.ubuntu.com/ftp.daum.net/g' /etc/apt/sources.list
sudo sed -i 's/security.ubuntu.com/ftp.daum.net/g' /etc/apt/sources.list
sudo apt-get -qq update > /dev/null 2>&1

echo "###### 1 Housekeeping - Install build tools and korean language pack ######"
sudo apt-get -qq install -y build-essential git-core language-pack-ko > /dev/null 2>&1
sudo apt-get -qq -y autoremove > /dev/null 2>&1

echo "###### 1 Housekeeping - Set timezone to seoul ######"
echo 'Asia/Seoul' | sudo tee /etc/timezone
sudo dpkg-reconfigure -f noninteractive tzdata > /dev/null 2>&1

# Install mongodb
# from http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
echo "###### 2 Dependencies - mongodb ######"
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 > /dev/null 2>&1
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get -qq update > /dev/null 2>&1
sudo apt-get -qq -y install mongodb-org > /dev/null 2>&1

# Install nodejs
echo "###### 2 Dependencies - nodejs ######"
curl -sL https://deb.nodesource.com/setup | sudo bash - > /dev/null 2>&1
sudo apt-get -qq -y install nodejs > /dev/null 2>&1

# Install node modules
echo "###### 2 Dependencies - nodejs modules ######"
sudo npm install -g node-gyp strongloop grunt-cli bower > /dev/null 2>&1
cd /vagrant
npm install && bower install
slc run -d
