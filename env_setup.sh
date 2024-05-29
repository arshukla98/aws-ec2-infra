#!/bin/bash

# List of required environment variables
required_env_vars=(
    "POSTGRES_USER"
    "POSTGRES_PASSWORD"
    "HOST"
    "GITHUB_TOKEN"
    "AUTH_CLIENT_ID"
    "AUTH_CLIENT_SECRET"
    "AWS_ACCESS_KEY_ID"
    "AWS_SECRET_ACCESS_KEY"
)

# Function to check if an environment variable is set
check_env_var() {
    local var_name=$1
    if [ -z "${!var_name}" ]; then
        echo "Error: Environment variable $var_name is not set."
        exit 1
    fi
}

# Check each required environment variable
for var in "${required_env_vars[@]}"; do
    check_env_var $var
done

echo "All required environment variables are set."
