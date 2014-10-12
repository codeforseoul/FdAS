# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
# See https://docs.vagrantup.com/v2/vagrantfile/
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Using official ubuntu box from vagrantcloud.com
  # https://vagrantcloud.com/ubuntu/trusty32
  config.vm.box = "ubuntu/trusty32"

  # The loopback app uses port 3000.
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  # config.vm.network "private_network", ip: "192.168.33.10"

  # config.vm.network "public_network"
  # config.ssh.forward_agent = true
  # config.vm.synced_folder "../data", "/vagrant_data"

  config.vm.provider "virtualbox" do |vb|
    vb.name = 'FdAS'
    vb.memory = 512
    vb.cpus = 2
  end

  config.vm.provision "shell", :path => "provision.sh", :privileged => false

end
