#!/bin/sh

# Install the latest version of Git
yum -y remove git*
yum -y install https://packages.endpoint.com/rhel/7/os/x86_64/endpoint-repo-1.7-1.x86_64.rpm
yum -y install git

# Disable SELinux
echo $'SELINUX=disabled\nSELINUXTYPE=targeted' | sudo tee /etc/selinux/config

# Uninstall old docker versions
yum -y remove \
  docker \
  docker-client \
  docker-client-latest \
  docker-common \
  docker-latest \
  docker-latest-logrotate \
  docker-logrotate \
  docker-engine

# Install Docker
yum -y install yum-utils
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

yum -y install \
  docker-ce \
  docker-ce-cli \
  containerd.io

# Enable Docker as a service
systemctl enable docker

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose