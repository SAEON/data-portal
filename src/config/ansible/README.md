# Overview
The best description of Ansible I have found was at [snel.com](https://www.snel.com/support/how-to-install-ansible-on-centos-7/):

>Ansible is an open source automation software written in Python. It runs on UNIX-like systems and can provision and configure both UNIX-like and Windows systems. Unlike other automation software, Ansible does not require an agent to run on a target system. It leverages on the SSH connection and python interpreter to perform the given tasks on the target system. Ansible can be installed on a cloud server to manage other cloud servers from a central location, or it can also be configured to use on a personal system to manage cloud or on-premises systems.

In this case it is assumed that Ansible is installed on your own PC as the __controller__, and it will be used to connect to CentOS 7 Virtual Servers - the __hosts__. As mentioned above, these servers do NOT need to have Ansible installed, but they do need Python 2 (I think - not 3). Your PC will act as an ansible controller, and the virtual server will be ansible nodes.

# Install Ansible on your computer (assuming a WSL Ubuntu environment or similar)
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

# Configure your virtual server(s)
Configure your virtual servers so that passwordless login is possible from your computer (i.e. the Ansible __controller__). This means setting up SSH login from this computer on the virtual servers (__hosts__). Test that login works via `ssh <username>@<ip>` (NOT `root@<ip>`).

In other words, although server configuration is automated via Ansible, you still need to configure the basics yourself.

#### Copy your public SSH key
```sh
# Copy the output of this command
cat ~/.ssh/id_rsa.pub
```


#### Setup a user on each server
>NOTE: All the servers should have the same username (`<name>`)
```sh
ssh root@<ip>
adduser <name>
su <name>
mkdir ~/.ssh
chmod 700 ~/.ssh
touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
vi ~/.ssh/authorized_keys # Copy your id_rsa.pub key into this file
exit # Now you should be root user again

# Now give your user passwordless-sudo access
visudo

# Add this lines to the bottom of the visudo file
# Actually, you can achieve sudo access by other means,
# For example "usermod -a -G <groupName> <user>" (assuming)
# The group as sudo access. Per-user is my current preference.
# Also, it's worthwhile knowing how to grant sudo access to
# certain commands, which this approach allows
<name> ALL=(ALL) NOPASSWD:ALL

# Logout the VM
exit
```

#### Disable root login on each server
```sh
ssh <name>@<ip>
sudo su
vi /etc/ssh/sshd_config
# Find PermitRootLogin, and set it to "no" (uncomment it if required). Also make sure PasswordAuthentication is "no"
service sshd restart # service ssh restart for Ubuntu
```

# Configure your Ansible server
Your PC is now an Ansible controller. You have to configure it to know where the all your hosts are.

#### Set Ansible username of host machines
The default username that Ansible will use when connecting to your hosts is your current username of your PC (the Ansible server). This isn't always ideal, so best to explicitly configure this. But there's a way to specify this per host anyway.

```sh
sudo mkdir /etc/ansible/group_vars
sudo nano /etc/ansible/group_vars/servers

# Add this line to that files
ansible_ssh_user:<name>
```

#### Specify all Ansible hosts
```sh
sudo nano /etc/ansible/hosts

# Add the following to the file
[catalogue]
<ip>
```
