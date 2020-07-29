# Scripted server configuration
Configuring servers comes down to running a number of shell commands. Together, these commands can be referred to as a script. This readme discusses how to setup an orchestration tool ([Ansible](https://www.ansible.com/)) to run simple shell scripts on virtual servers. If you don't want to use Ansible, you can still refer to this README to find the shell commands for setting up a Linux server to run the catalogue software. It's worth the read though - beautifully written, though I say so myself :)!
# Ansible overview
The best description of Ansible I have found was at [snel.com](https://www.snel.com/support/how-to-install-ansible-on-centos-7/):

> Ansible is an open source automation software written in Python. It runs on UNIX-like systems and can provision and configure both UNIX-like and Windows systems. Unlike other automation software, Ansible does not require an agent to run on a target system. It leverages on the SSH connection and python interpreter to perform the given tasks on the target system. Ansible can be installed on a cloud server to manage other cloud servers from a central location, or it can also be configured to use on a personal system to manage cloud or on-premises systems.

In this case it is assumed that Ansible is installed on your own PC as the __controller server__, and it will be used to connect to virtual machines running Linux - the __hosts__. As mentioned above, these servers (the hosts) do NOT need to have Ansible installed, but they do need Python 2 (I think - not 3). Your PC will act as an ansible controller, and the virtual server will be ansible nodes.

Essentially the ansible controller has the ability to run shell commands on hosts. This allows you to specify, for example, several thousand virtual servers and run exactly the same shell commands on each, concurrently. (Although you would have to setup users and SSH for each of these several thousand virtual machines - which you can do with Ansible, but that is not shown here - and you would also then have to pay for several thousand virtual machines).

On top of this core-functionality (running specified shell commands on a number of hosts), instead of specifying shell commands to run on servers, Ansible allows you to specify the _state_ that servers should be. And then interprets that _state_ into a series of shell commands that it runs on each host. Configuring host _state_ is done in Ansible [___Playbooks___](https://docs.ansible.com/ansible/latest/user_guide/playbooks.html). Playbook-syntax is sufficiently complicated enough that it can be considered an orchestration language in it's own right (according to Ansible). For an example of a scenario that a Playbook is useful as opposed to simple shell scripts: setting up a server may involve appending to a configuration file. This can be done via a simple command:

```sh
sudo echo ... >> some_config_file
```

Such a command is NOT [idempotent](https://en.wikipedia.org/wiki/Idempotence), and probably should be. Ansible Playbooks provide this guarantee without users having to write messy shell scripts that involve manipulating configuration file contents as strings. Of course, writing such Playbooks becomes complicated...

Instead, this repository uses a very simple Playbook to [execute a shell script](https://docs.ansible.com/ansible/latest/modules/script_module.html) (which is slightly better than specifying many shell commands in a Playbook).

If you can't / don't want to install Ansible on your computer then you can refer to the shell scripts and just run the commands manually. But... challenge yourself! Ansible is a fun and worthwhile tool.

# Setup your virtual server(s)
Configure your virtual servers so that passwordless login is possible from your computer (i.e. the Ansible __controller__). This means setting up SSH login on the virtual servers (__hosts__). Once this is done you should be able to login to your virtual servers via SSH.

```sh
ssh <name>@<ip> # Assuming the standard SSH port of 22
```

In other words, although server configuration is automated via Ansible, you still need to configure the basics yourself. i.e. on every host you need to configure a user, and how that user logs in.

If you are not familiar with how to setup passwordless SSH login on a Linux server, look for help online ([the Digital Ocean tutorials](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-1804) are particularly good).

```sh
# Copy the RSA public key on your PC (the output of this command)
cat ~/.ssh/id_rsa.pub
```

> NOTE All the servers should have the same username (`<name>`)

```sh
# Login to your shiny new server. You will probably need a password
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

# Disable root login
ssh <name>@<ip>
sudo su
vi /etc/ssh/sshd_config

# Find PermitRootLogin, and set it to no (uncomment it if required)
# Also make sure PasswordAuthentication is no

# Restart the ssh daemon
service sshd restart # Ubuntu: service ssh restart
```

# Configure your Ansible controller
Your PC is an Ansible controller. You have to:

1. Install Ansible
2. configure it to know about the hosts

## Install Ansible on your computer
This assumes your development environment is Linux or similar (for example on Windows, you can use the WSL Ubuntu environment)
```sh
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-add-repository ppa:ansible/ansible
sudo apt-get update
sudo apt-get install ansible -y

# Install python if necessary
python --version

# Check that ansible is installed
ansible --version
```

## Specify Ansible hosts

```sh
sudo nano /etc/ansible/hosts # or vim. I like vim

# Add the following to the file (choosing appropriate group-name, server-name, etc. values)
[<group-name>]
<server_name> ansible_host=<ip> ansible_user=<name>
<server_name_2> ansible_host=<ip_2> ansible_user=<name>
```

> NOTE Some tutorials mention setting the global Ansible configuration for the user that is used for host access. I think that specifying this explicitly in the hosts file is better, though I'm not sure what version of Ansible the online tutorials that I found this information in refer to. If for some reason, specifying "ansible_user" in the hosts file doesn't work, then look at the following instructions

```sh
# Set Ansible username of all host machines
sudo mkdir /etc/ansible/group_vars
sudo nano /etc/ansible/group_vars/servers

# Add this line to that files
ansible_ssh_user:<name>
```

## Use Ansible!
Basic Ansible usage, including pinging hosts, executing commands, and executing Playbooks

#### Test that your Ansible configuration works with the following commands
```sh
# Try pinging all the hosts in the host file
ansible -m ping all

# Try pinging all the hosts of a group
ansible -m ping <group-name>

# Try pinging an individual server
ansible -m ping <server-name>

# Try pinging specific hosts
ansible -m ping <server_name>:<server_name_2>
```

#### Execute shell commands using Ansible
```sh
ansible -m shell -a 'sudo ls -lsa' <group-name>

# ansible -m shell => The ansible CLI, using the 'shell' module (-m)
# -a => Arguments passed to the shell module
# sudo ls -lsa => The command to execute (an argument passed to the Ansible shell module)
# <group-name> => The servers on which to execute the shell command
```

#### Execute an Ansible playbook
```sh
# Execute this command from <repo-root>/src/config/servers
ansible-playbook centos-7/setup-server.yml
```