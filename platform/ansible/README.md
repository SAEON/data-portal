# Scripted server configuration
Configuring servers comes down to running a number of shell commands. Together, these commands can be referred to as a script. This readme discusses how to setup an orchestration tool ([Ansible](https://www.ansible.com/)) to run simple shell scripts on virtual servers. If you don't want to use Ansible, you can still refer to this README to find the shell commands for setting up a Linux server to run the catalogue software. It's worth the read though - beautifully written, though I say so myself :)!

# Ansible overview
The best description of Ansible I have found was at [snel.com](https://www.snel.com/support/how-to-install-ansible-on-centos-7/):

> Ansible is an open source automation software written in Python. It runs on UNIX-like systems and can provision and configure both UNIX-like and Windows systems. Unlike other automation software, Ansible does not require an agent to run on a target system. It leverages on the SSH connection and python interpreter to perform the given tasks on the target system. Ansible can be installed on a cloud server to manage other cloud servers from a central location, or it can also be configured to use on a personal system to manage cloud or on-premises systems.

In this case it is assumed that Ansible is installed on your own PC as the __controller server__, and it will be used to connect to virtual machines running Linux - the __hosts__. As mentioned above, these servers (the hosts) do NOT need to have Ansible installed, but they do need Python 2 installed (Python 3 works, with additional configuration). Your PC will act as an ansible controller, and the virtual machines are ansible nodes.

Essentially the ansible controller has the ability to run shell commands on hosts. This allows you to specify, for example, several thousand virtual servers and run exactly the same shell commands on each, concurrently. (Although you would have to setup users and SSH for each of these several thousand virtual machines - which you can do with Ansible, but that is not shown here - and you would also then have to pay for several thousand virtual machines).

You can run shell commands on hosts using the Ansible CLI, or you can provide Ansible a configuration file that tells it what commands to run on the server. Extending this, you can specify general _tasks_ for Ansible to complete on hosts that can be as simple as a single command, or more complex. These configuration files are called [___Playbooks___](https://docs.ansible.com/ansible/latest/user_guide/playbooks.html).Playbook syntax is sufficiently complicated enough that it can be considered an orchestration language in it's own right (according to Ansible). A scenario that a Playbook is useful as opposed to simple shell scripts is, for example, editing a configuration file. This can be done via a simple command:

```sh
sudo echo ... >> some_config_file
```

Such a command is NOT [idempotent](https://en.wikipedia.org/wiki/Idempotence), and probably should be (especially when editing `/etc/sudoers`). Ansible Playbooks provides idempotency without users having to write messy shell scripts that involve manipulating configuration file contents as strings. In the case of editing `/etc/sudoers`, it's also possible to protect against mistakes by validating changes prior to saving.

If you can't / don't want to install Ansible on your computer then you can refer to the shell scripts and just run the commands manually (run the commands with `sudo` access). But... challenge yourself! Ansible is a fun and worthwhile tool.

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

# Configure your Ansible controller
Your PC is an Ansible controller. You have to:

1. Install Ansible
2. Configure it to know about the hosts

## Install Ansible on your computer
This assumes your development environment is Linux or similar (for example on Windows, you can use the WSL Ubuntu environment)
```sh
sudo apt-get update
sudo apt-get install ansible -y

# Check that ansible is installed
ansible --version
```

## Make sure Python is installed on the hosts
Ansible doesn't need much... But it does need to be able to execute python2 on the host machines (i.e. Python2 must be installed on the host machines - this is usually included in the OS). It's also possible to use Python3, in which case adjust the [inventory file](inventories/centos-7) appropriately.

## Specify Ansible hosts
Running `ansible-playbook` will use the default inventory at `/etc/ansible/hosts`. An inventory is inlcuded in this respository at [inventories/centos-7](inventories/centos-7). Specify this file by using the flag `-i <inventory file>` (after editing the hosts appropriately of course!).

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
# Execute this command from <repo-root>/src/platform/ansible
ansible-playbook playbooks/centos-7.yml -i inventories/centos-7
```

# Notes
Some gotchas that are worth writing down
- [Nginx SSL certs must be ordered correctly](https://www.ssls.com/knowledgebase/how-to-install-an-ssl-certificate-on-a-nginx-server/)