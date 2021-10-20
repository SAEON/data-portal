# Server configuration (catalogue software)
Configuring servers comes down to running a number of shell commands. Together, these commands can be referred to as a script. This readme discusses how to setup an orchestration tool ([Ansible](https://www.ansible.com/)) to run simple shell scripts on virtual servers. If you don't want to use Ansible, you can still refer to this README to find the shell commands for setting up a Linux server to run the catalogue software. It's worth the read though - beautifully written, though I say so myself :)!


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** 

- [Overview](#overview)
- [Setup your virtual server(s) for passwordless login](#setup-your-virtual-servers-for-passwordless-login)
- [Setup Ansible](#setup-ansible)
- [Setup your Ansible inventory](#setup-your-ansible-inventory)
- [Use Ansible!](#use-ansible)
- [SSL](#ssl)
  - [SAEON SSL certificates](#saeon-ssl-certificates)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview
The best description of Ansible I have found was at [snel.com](https://www.snel.com/support/how-to-install-ansible-on-centos-7/):

> Ansible is an open source automation software written in Python. It runs on UNIX-like systems and can provision and configure both UNIX-like and Windows systems. Unlike other automation software, Ansible does not require an agent to run on a target system. It leverages on the SSH connection and python interpreter to perform the given tasks on the target system. Ansible can be installed on a cloud server to manage other cloud servers from a central location, or it can also be configured to use on a personal system to manage cloud or on-premises systems.

In this case it is assumed that Ansible is installed on your own PC as the __controller server__, and it will be used to connect to virtual machines running Linux - the __hosts__. As mentioned above, these servers (the hosts) do NOT need to have Ansible installed, but they do need Python 2 installed (Python 3 works, with additional configuration, and is probably worth a TODO in the future). Your PC/laptop will act as an ansible controller, and the virtual machines are ansible nodes.

Essentially the ansible controller has the ability to run shell commands on hosts. This allows you to specify, for example, several thousand virtual servers and run exactly the same shell commands on each, concurrently. Many cloud VPS providers such as Digital Ocean, Hetzner, Linode, etc. provide an API for creating and destroying virtual servers, which is why this is useful.

You can run shell commands on hosts using the Ansible CLI (installed on your local computer), or you can provide Ansible a configuration file that tells it what commands to run on the server. Extending this, you can specify general _tasks_ for Ansible to complete on hosts that can be as simple as a single command, or more complex. These configuration files are called [___Playbooks___](https://docs.ansible.com/ansible/latest/user_guide/playbooks.html). Playbook syntax is sufficiently complicated enough that it can be considered an orchestration language in it's own right (according to Ansible).

Ansible allows for specifying [idempotent](https://en.wikipedia.org/wiki/Idempotence) server configuration tasks. This is very helpful - take, for example, editing a Linux configuration file (such as `/etc/sudoers`). This can be done via a simple shell command:

```sh
sudo echo ... >> some_config_file
```

Such a command is NOT idempotent - you can only run this command once. Running such a command multiple times can break server configuration. Ansible Playbooks provides idempotency without users having to write messy shell scripts that involve manipulating configuration file contents as strings. In the case of editing `/etc/sudoers`, it's also possible to protect against mistakes by validating changes prior to saving (without Ansible you would need to implement this logic yourself).

Of course it's also possible that an Ansible playbook is just a series of shell commands, and so the fact that you are configuring a server via Ansible does NOT in and of itself guarantee idempotency. Always read scripts before executing them on a server!!

If you can't / don't want to install Ansible on your computer then you can still refer to the [__playbook__](ansible/playbooks/centos-7.yml) and just run the commands manually (run the commands with `sudo` access). Reading the playbook file it should be easy to figure out what commands are required to run. But... challenge yourself! Ansible is a fun and worthwhile tool.

# Setup your virtual server(s) for passwordless login
The Ansible playbook in this repository assumes a user with passwordless login is setup.

Configure your virtual servers so that passwordless login is possible from your computer (i.e. the Ansible __controller__). This means setting up SSH login on the virtual servers (__hosts__). Once this is done you should be able to login to your virtual servers via SSH (without entering a password).

```sh
ssh <name>@<ip> # Assuming the standard SSH port of 22
```

In other words, although server configuration is automated via Ansible, you still need to configure the basics yourself. i.e. on every host you need to configure a user, and how that user logs in.

If you are not familiar with how to setup passwordless SSH login on a Linux server, look for help online ([the Digital Ocean tutorials](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-1804) are particularly good).

```sh
# Copy the RSA public key on your PC (the output of this command)
cat ~/.ssh/id_rsa.pub

# Login to your shiny new server. You will probably be asked for a password
ssh root@<ip>

# Now setup a user
adduser <name>
su <name> # Login as the user you have just created
mkdir ~/.ssh
chmod 700 ~/.ssh
touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
vi ~/.ssh/authorized_keys # Copy your id_rsa.pub key into this file
exit # Logout the user, back to root

# Give your user passwordless-sudo access
visudo

# Add this line to the bottom of the visudo file
# Actually, you can achieve sudo access by other means,
# For example "usermod -a -G <groupName> <user>" (assuming
# The group as sudo access). Per-user is my current preference.
# Also, it's worthwhile knowing how to grant sudo access to
# certain commands, which this approach allows
<name> ALL=(ALL) NOPASSWD:ALL
```
>NOTE It's very embarrassing telling the sysadmin that you have locked yourself out of your new server

```sh
# Logout the VM, and test that you can login with your new user
exit
ssh <name>@ip

# Configure public key authentication and disable root login
ssh <name>@<ip>
sudo su
vi /etc/ssh/sshd_config
# set PubkeyAuthentication to 'yes'
# set PermitRootLogin to 'no'
# set PasswordAuthentication to 'no'

# Restart the ssh daemon
service sshd restart # Ubuntu: service ssh restart
```

# Setup Ansible
Ansible does not require any setup on the servers you are configuring (unless they don't include Python2). You have to install Ansible on YOUR computer (i.e. the Ansible controller), and you have to specify (on your computer) which hosts Ansible should configure. If the servers you are configuring don't have Python2 installed you would need to install that manually. If the servers you are configuring only have Python3 installed, you can use Python3 (but I don't know how - please extend this readme).

This guide assumes your development environment is Linux or similar (for example on Windows, you can use the WSL2 Ubuntu environment or some other virtual Linux environment).

```sh
sudo apt-get update
sudo apt-get install ansible -y
ansible --version # Just to check that ansible is installed
```

# Setup your Ansible inventory
An ansible inventory is a list of hosts to configure. Running the `ansible-playbook` command will use the default inventory at `/etc/ansible/hosts`. You can edit this file, or you can provide your own inventory (recommended).

An inventory is included in this repository at [inventories/centos-7](ansible/inventories/centos-7) as a reference. It's also the exact inventory file used to setup the [SAEON Data Portal](https://catalogue.saeon.ac.za) deployments. You won't be able to use this file unless you create a user called `zach` (which I assume is not your name, since it's my name).

Refer to the [inventory file](ansible/inventories/centos-7) and create a suitable variation of this file for yourself. When you run the ansible command, specify your inventory file by using the flag `-i <inventory file>`.

# Use Ansible!
Test that your Ansible configuration works, and learn Ansible at the same time! Here are some basic useful examples of using the Ansible CLI

```sh
# Try pinging all the hosts in the inventory file
ansible -i <inventory file> -m ping all

# Try pinging all the hosts of a group
ansible -i <inventory file> -m ping <group-name>

# Try pinging an individual server
ansible -i <inventory file> -m ping <server-name>

# Try pinging specific hosts
ansible -i <inventory file> -m ping <server_name>:<server_name_2>

# Execute shell commands using Ansible
ansible -m shell -a 'sudo ls -lsa' <group-name>
# Command breakdown
## ansible -m shell
### => This is the Ansible CLI, using the 'shell' module (-m)
## -a
### => Arguments passed to the shell module
## 'sudo ls -lsa'
### => The command to execute (an argument passed to the Ansible shell module)
## <group name>
### => The name of the group in the inventories file (I haven't used groups in the inventory file)

# Execute the Ansible playbook in this repository, with the example inventory (from platform/ansible/)
ansible-playbook playbooks/centos-7.yml -i inventories/centos-7
```

# SSL
Using the ansible script in this repository will configure Nginx such that non-https traffic is redirected to https for all public facing host addresses (the clients and api). If you look at the [Nginx configuration files](playbooks/templates/nginx) you will see that the Nginx server blocks specify paths to SSL certificates as well as the path to dhparam.pem, used for the [Diffie–Hellman key exchange
](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange). The `dhparam.pem` file is created during Ansible configuration, however, the SSL certificates are NOT!

Currently setting up SSL is a manual process. After running the Ansible playbook, the Nginx service will fail until the appropriate certificates are created. Three certificates are required, these are:

- `<hostname>` (for example, catalogue.saeon.ac.za)
- api.`<hostname>` (for example, api.catalogue.saeon.ac.za)
- proxy.`<hostname>` (for example, proxy.catalogue.saeon.ac.za)

> NOTE - a domain name is required for the software to to run, since the API service is addressed as the subdomain of that domain. `api.<some IPv4 address>` is not addressable, and therefore will not work. The Nginx server blocks that Ansible installs route requests based on subdomain. To install and test this software __without__ a domain, adjust the files that Ansible copied to `/etc/nginx/conf.f/*.conf` manually. (And provide sensible alternatives to the default service environment variables).
## Self-signed SSL
You can generate appropriate self-signed SSL certs via the following commands:

```sh
sudo openssl req -x509 -nodes -days 999 -newkey rsa:2048 -keyout /opt/ssl/<hostname>.key -out  /opt/ssl/<hostname>.cer
sudo openssl req -x509 -nodes -days 999 -newkey rsa:2048 -keyout /opt/ssl/api.<hostname>.key -out  /opt/ssl/api.<hostname>.cer
sudo openssl req -x509 -nodes -days 999 -newkey rsa:2048 -keyout /opt/ssl/<proxy hostname>.key -out  /opt/ssl/<proxy hostname>.cer
sudo service nginx restart
```
## SAEON SSL certificates
This is a helpful link regarding ordering certs for Nginx (it's worth noting that Nginx requires SSL certificates in a specific order that seems to be different to order in which they are generated at SAEON). Read this! [How to install an SSL Certificate on a Nginx Server](https://www.ssls.com/knowledgebase/how-to-install-an-ssl-certificate-on-a-nginx-server/). Usually the correct trick is to append interm.cer to the cert.cer file. For example:

```sh
cat <file name>.cert.cer > <file name>.cer
cat <file name>.interm.cer >> <file name>.cer
```
