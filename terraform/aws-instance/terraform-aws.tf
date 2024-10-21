terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configuring the AWS provider with access and secret keys.
provider "aws" {
  region = "eu-west-3"
  access_key = "***"
  secret_key = "***"
}

# Resource to create a TLS private key with name 'rsa_4096'.
resource "tls_private_key" "rsa_4096" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Variable to hold the key name that will be passed in when using the configuration.
variable "key_name" {
  default = "private_key.pem"
}

resource "aws_key_pair" "key_pair" {
  key_name   = var.key_name
  public_key = tls_private_key.rsa_4096.public_key_openssh
}

# Resource to save the private key locally as a file.
resource "local_file" "private_key" {
  content = tls_private_key.rsa_4096.private_key_pem
  filename = var.key_name
}

# Resource to create an EC2 instance in AWS with name 'public_instance'.
resource "aws_instance" "public_instance2" {
  # Amazon Machine Image (AMI) used for the instance, in this case a specific Ubuntu image.
  ami           = "ami-045a8ab02aadf4f88"
  instance_type = "t2.micro"
  key_name      = aws_key_pair.key_pair.key_name

  tags = {
    Name = "public_instance"
  }
}
