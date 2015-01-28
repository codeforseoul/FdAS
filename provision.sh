#!/bin/bash

# Housekeeping
sudo apt-get -qq update > /dev/null 2>&1

echo "###### 1 Housekeeping - Install build tools and korean language pack ######"
sudo apt-get -qq install -y build-essential git-core language-pack-ko g++ > /dev/null 2>&1
sudo apt-get -qq -y autoremove > /dev/null 2>&1

echo "###### 1/4 Housekeeping - Set timezone to seoul ######"
echo 'Asia/Seoul' | sudo tee /etc/timezone
sudo dpkg-reconfigure -f noninteractive tzdata > /dev/null 2>&1

# Install mongodb
# from http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
echo "###### 2/4 Dependencies - mongodb ######"
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 > /dev/null 2>&1
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get -qq update > /dev/null 2>&1
sudo apt-get -qq -y install mongodb-org > /dev/null 2>&1

# Install nodejs from source
echo "###### 3/4 Dependencies - nodejs ######"
# Set proper location and permission for installation of nodejs modules
sudo mkdir -p /usr/local/lib/node_modules
sudo chown -R vagrant:vagrant /usr/local/src /usr/local/bin /usr/local/share/man /usr/local/include /usr/local/lib/node_modules
# Compiling node.js!
cd /usr/local/src && mkdir node && cd node
wget http://nodejs.org/dist/v0.10.36/node-v0.10.36.tar.gz
tar xzvf node-v0.10.36.tar.gz && cd node-v0.10.36
./configure && make && make install

# Install node modules
echo "###### 4/4 Dependencies - nodejs modules ######"
npm install -g strongloop grunt-cli bower
cd /vagrant
npm install && bower install
slc run -d
echo 'done! open http://localhost:3000'
