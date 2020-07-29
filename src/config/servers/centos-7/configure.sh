#!/bin/sh

# Install the latest version of Git
sudo yum -y remove git*
sudo yum -y install https://packages.endpoint.com/rhel/7/os/x86_64/endpoint-repo-1.7-1.x86_64.rpm
sudo yum -y install git

# Disable SELinux
echo $'SELINUX=disabled\nSELINUXTYPE=targeted' | sudo tee /etc/selinux/config

# Uninstall old docker versions
sudo yum -y remove \
  docker \
  docker-client \
  docker-client-latest \
  docker-common \
  docker-latest \
  docker-latest-logrotate \
  docker-logrotate \
  docker-engine

# Install Docker
sudo yum -y install yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

sudo yum -y install \
  docker-ce \
  docker-ce-cli \
  containerd.io

# Enable Docker as a service
sudo systemctl enable docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose