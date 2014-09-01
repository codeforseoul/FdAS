#!/bin/bash

# Housekeeping
echo "###### 1 Housekeeping - Install build tools and korean language pack ######"
sudo apt-get install -y build-essential language-pack-ko
sudo apt-get -y autoremove

echo "###### 1 Housekeeping - Set timezone to seoul ######"
echo 'Asia/Seoul' | sudo tee /etc/timezone
sudo dpkg-reconfigure -f noninteractive tzdata

# Install mongodb
# from http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
echo "###### 2 Dependencies - mongodb ######"
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get -y install mongodb-org

# Install nodejs
echo "###### 2 Dependencies - nodejs ######"
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get -y install nodejs

# Install node modules
echo "###### 2 Dependencies - nodejs modules ######"
sudo npm install -g strongloop
