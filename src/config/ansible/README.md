# Overview
The best description of Ansible I have found was at [snel.com](https://www.snel.com/support/how-to-install-ansible-on-centos-7/):

>Ansible is an open source automation software written in Python. It runs on UNIX-like systems and can provision and configure both UNIX-like and Windows systems. Unlike other automation software, Ansible does not require an agent to run on a target system. It leverages on the SSH connection and python interpreter to perform the given tasks on the target system. Ansible can be installed on a cloud server to manage other cloud servers from a central location, or it can also be configured to use on a personal system to manage cloud or on-premises systems.

In this case it is assumed that Ansible is installed on your own PC as the __controller__, and it will be used to connect to Virtual Servers - the __hosts__. As mentioned above, these servers do NOT need to have Ansible installed, but they do need Python 2 (I think - not 3). Your PC will act as an ansible controller, and the virtual server will be ansible nodes.

#### Install Ansible on your computer (assuming a WSL Ubuntu environment)
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

#### Configure your virtual servers




