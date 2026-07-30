# ===================================================
# Basic commands and syntax for running the container
# Author: @edufssantos
# ===================================================

# FROM: Define the image base that will be used to build the container.
# WORKDIR: Define the working directory where the commands will be executed.
# COPY: Copies files from the local system to the container.
# RUN: Executes commands during the image building process, such as installing packages.
# EXPOSE: Exposes a port so that the container can be accessed externally.
# USER: Defines the default user to run commands in the container.
# CMD: Specifies the default command that will be executed when the container starts.

# ===================================================
# Project 'devops' Dockerfile settings
# ===================================================

# Name of the image
FROM httpd:2.4-alpine

# Copy the project files to the container
COPY project/ /usr/local/apache2/htdocs/

# Expose the port 80 for the web server
EXPOSE 80