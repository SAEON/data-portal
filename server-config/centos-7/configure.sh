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

# Uninstall current docker versions if applicable
yum -y remove docker-ce docker-ce-cli containerd.io

# Install Docker
yum -y install yum-utils
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

yum -y install \
  docker-ce \
  docker-ce-cli \
  containerd.io

# Enable Docker as a service
systemctl enable docker
systemctl start docker

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Setup Nginx
yum -y install epel-release
yum -y install nginx
systemctl enable nginx
systemctl start nginx
firewall-cmd --permanent --zone=public --add-service=http 
firewall-cmd --permanent --zone=public --add-service=https
firewall-cmd --reload

# GitHub actions runner needs to update Nginx configuration, which needs sudo. Allow this:
echo cp ./server-config/nginx/next/server-blocks/* /etc/nginx/conf.d/ > /opt/copy-nginx-server-blocks.sh
echo service nginx reload > /opt/reload-nginx.sh
chmod +x /opt/copy-nginx-server-blocks.sh
chmod +x /opt/reload-nginx.sh

# Setup a github actions runner
adduser runner
sudo usermod -aG docker runner

# TODO etc/sudoers needs the following appended. But that is not safe with shell commands that could be rerun
# runner ALL=NOPASSWD: /home/runner/svc.sh
# runner ALL=NOPASSWD: /opt/reload-nginx.sh
# runner ALL=NOPASSWD: /opt/copy-nginx-conf.sh
# runner ALL=NOPASSWD: /opt/copy-nginx-server-blocks.sh