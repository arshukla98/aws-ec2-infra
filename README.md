# Building and Running Backstage with Kubernetes Deployment

This guide provides detailed instructions on setting up, building, cleaning, and running Backstage, including creating a Docker image and deploying it to Kubernetes.

## Prerequisites

Ensure you have the following installed on your system:
- Docker
- Yarn
- Node.js
- Make
- Kubernetes CLI (`kubectl`)

## Makefile Commands

### 1. Set Up Environment

The `env` target in the Makefile runs the `env_setup.sh` script to configure the environment:

```bash
make env
```

### 2. Clean Build Artifacts

The `clean` target removes generated build artifacts to ensure a fresh build:

```bash
make clean
```

### 3. Run Backstage

The `run` target installs dependencies, compiles TypeScript code, and builds the backend with the specified configuration file:

```bash
make run
```

This target performs the following actions:
- Installs dependencies using Yarn with a frozen lockfile to ensure consistent dependency versions.
- Compiles TypeScript code.
- Builds the backend using the `app-config.production.yaml` configuration file.

### 4. Build Docker Image

The `docker` target builds a Docker image for Backstage:

```bash
TAG=backstage:1.4.0-infra make docker
```

This target performs the following actions:
- Builds the Docker image using the `Dockerfile` located in the `packages/backend` directory.
- Tags the image with the specified tag (`backstage:1.4.0-infra`).
- Uses the `--no-cache` option to ensure a fresh build without using cached layers.

## Kubernetes Deployment

Apply the following Kubernetes YAML files in the specified order to deploy Backstage:

1. Create the namespace:

    ```bash
    kubectl apply -f 01_ns.yaml
    ```

2. Apply PostgreSQL secrets:

    ```bash
    kubectl apply -f 02_postgres-secrets.yaml
    ```

3. Apply PostgreSQL storage configuration:

    ```bash
    kubectl apply -f 03_postgres-storage.yaml
    ```

4. Deploy PostgreSQL:

    ```bash
    kubectl apply -f 04_postgres.yaml
    ```

5. Apply PostgreSQL config map:

    ```bash
    kubectl apply -f 05_02_postgres-cm.yaml
    ```

6. Create PostgreSQL service:

    ```bash
    kubectl apply -f 05_postgres-service.yaml
    ```

7. Apply Backstage secrets:

    ```bash
    kubectl apply -f 06_backstage-secrets-prodv1.yaml
    ```

8. Deploy Backstage:

    ```bash
    kubectl apply -f 07_backstage.yaml
    ```

9. Create Backstage service:

    ```bash
    kubectl apply -f 08_backstage-svc.yaml
    ```
10. This is how kube cluster is after applying the kubernetes manifests.

    ![kube_cluster_shot](image.png)

## Summary

This README provides a comprehensive guide to setting up, building, and running Backstage using a Makefile and deploying it to Kubernetes. By following these instructions, you can ensure a clean environment, build the necessary components, create a Docker image for deployment, and apply the necessary Kubernetes configurations in the correct order.
