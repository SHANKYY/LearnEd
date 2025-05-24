FROM jenkins/ssh-agent:latest-jdk17

USER root

# Install Node.js dependencies
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install specific npm version compatible with Node.js 18
RUN npm install -g npm@10.2.4

# Verify installations
RUN node --version && npm --version

USER jenkins 