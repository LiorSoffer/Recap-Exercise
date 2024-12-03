# Client-Server Application with React and Express

This project demonstrates a simple client-server application built using React for the frontend and Express for the backend. The application has been deployed in two different environments: first on virtual machines and second on a Kubernetes cluster using Minikube.

## Architecture Overview

### First Approach: Virtual Machines

In the first part of the exercise, the React client application and the Express server application were run on separate virtual machines. The virtual machines were set up to be on the same network, ensuring that the client could send HTTP requests to the server and receive responses. 

- **Client (React)**: The React application was deployed and served on a virtual machine with a specific IP address.
- **Server (Express)**: The Express server was hosted on a second virtual machine.
- **Networking**: The two virtual machines were configured to communicate over the same network, allowing the React client to interact with the Express server.

### Second Approach: Kubernetes with Minikube

In the second part, Minikube was used to create a local Kubernetes cluster. Both the React client and the Express server were deployed on separate Kubernetes deployments.

- **Client (React)**: The React application was exposed using a NodePort service.
- **Server (Express)**: The Express server was exposed using a ClusterIP service.
- **Networking**: The server was accessed locally using `kubectl port-forward`, mapping the Express service's port to a local port (3001). The React application could be accessed via a URL provided by Minikube's service.

## Steps Followed

### Part 1: Running on Virtual Machines

1. **Hypervisor Setup**:
   - Used **Boxes** as the hypervisor to create and manage virtual machines.
   - Downloaded the **Fedora Workstation Live** OS.
2. **Virtual Machine Configuration**:
   - Created two virtual machines running Fedora Workstation Live.
   - Allocated 30 GiB of hard disk space to each virtual machine during the installation process.
3. **Application Setup**:
   - Ran the Express server on one virtual machine.
   - Updated the React application to use the IP address of the virtual machine running the Express server in its `GET` request URL.
4. **Networking**:
   - Ensured both virtual machines were on the same network for communication.
5. **Testing**:
   - Opened the React application on the second virtual machine.
   - Verified communication by clicking a button in the React app and observing a successful response from the Express server.

### Part 2: Running on Minikube Cluster

1. Navigate to the directory `Recap-Exercise/config`.
2. Start Minikube:
   ```bash
   minikube start
   ```
3. Apply the Kubernetes configurations for the React and Express applications:
   ```bash
   kubectl apply -f react.yaml
   kubectl apply -f express.yaml
   ```
4. Port-forward the Express service to make it accessible on localhost:
   ```bash
   kubectl port-forward service/express-service 3001:80
   ```
5. Open a new terminal (keep the first one open)

6. Scale the Express deployment to 5 replicas:
   ```bash
   kubectl scale deployment express-app --replicas=5
   ```
7. Expose the React application using Minikube’s service URL:
   ```bash
   minikube service react-service --url
   ```
   Open the URL provided to access the React application.

## Differences Between the Two Approaches

### Virtual Machine-based Approach
- **Networking**: Communication between client and server happens over a traditional network where both machines must be configured properly for communication.
- **Deployment**: The applications (client and server) are run directly on virtual machines without containerization.
- **Scaling**: Scaling is done manually, such as adding more VMs if necessary.

### Minikube-based Kubernetes Cluster
- **Networking**: Communication between services in Kubernetes is handled internally via Kubernetes services (ClusterIP for internal access, NodePort for external access).
- **Deployment**: Both client and server are deployed as Kubernetes deployments and managed using Kubernetes configurations.
- **Scaling**: Kubernetes allows easy scaling of applications by adjusting the replica count for deployments. Kubernetes handles service discovery and load balancing between replicas.

## Advantages and Disadvantages

### Virtual Machine-based Approach

**Advantages**:
- Simple and straightforward to set up if you are already familiar with virtual machines.
- Full control over the environment and networking configuration.

**Disadvantages**:
- Requires manual configuration for network communication between virtual machines.
- Not as scalable or flexible as Kubernetes for managing multiple services or handling failures.
- using virtual machines makes it more challenging to share your project since others would need to replicate the environment by downloading the VM, installing Node.js, running `npm install`, and configuring the setup manually.

### Minikube-based Kubernetes Cluster

**Advantages**:
- Easier to scale and manage deployments with Kubernetes’ built-in features such as replicas and service discovery.
- Containerized applications make it easier to deploy and manage different environments (e.g., dev, staging, production).
- Minikube provides a local Kubernetes cluster, perfect for development and testing.

**Disadvantages**:
- Requires understanding of Kubernetes concepts (deployments, services, etc.).
- Overhead of running Minikube and Kubernetes locally.

## Conclusion

Both approaches are valid for deploying client-server applications, but Minikube with Kubernetes offers a more scalable and flexible solution for production-like environments.
