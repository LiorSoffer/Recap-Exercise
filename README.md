# **Client-Server Application Deployment**

This project demonstrates a simple client-server application built with Express, deployed in two different environments:
1. **Virtual Machines** for a traditional setup.
2. **Kubernetes Cluster** using Minikube for containerized deployment.

---

## **Deployment Approaches**

### **1. Virtual Machines**

- **Client**: Deployed and served on a virtual machine.
- **Server**: Hosted on a second virtual machine.
- **Networking**: Configured both virtual machines to communicate over the same network, enabling the client to interact with the server.

### **Steps:**
1. **Setup the Hypervisor**:
   - Used **Boxes** as the hypervisor to create and manage virtual machines.
   - Downloaded the **Fedora Workstation Live** OS as the virtual machine operating system.

2. **Configure Virtual Machines**:
   - Created two virtual machines running Fedora Workstation Live.
   - Installed Node.js on each VM.

3. **Network Configuration**:
   - Ensured both virtual machines were on the same network to allow communication.
   - Edited the client .env file

       ![image](https://github.com/user-attachments/assets/ce9dae00-9528-4f93-aec5-e2b89035a4db)

4. **Application Deployment**:
   - **Server**: Started the server application on one virtual machine using.
   - **Client**: Started the client application on the second virtual machine.

5. **Testing**:
   - Accessed the client application in the second virtual machine.
   - Verified successful communication by interacting with the client and confirming server responses.

---

### **2. Kubernetes with Minikube**

- **Client**: Exposed via a **NodePort** service for external access.
- **Server**: Exposed via a **ClusterIP** service for internal communication.
- **Networking**: Leveraged Kubernetes' internal DNS for the client to communicate with the server.

### **Steps:**

1. **Start Minikube**:
   ```bash
   minikube start
   ```
2. **Network Configuration**
   - Edited the client .env file

      ![image](https://github.com/user-attachments/assets/be2169de-87c3-42bd-8d9a-cc2919ddf854)

3. **Deploy Applications**:
   - Applied Kubernetes manifests for the client and server applications:
     ```bash
     kubectl apply -f client.yaml
     kubectl apply -f express.yaml
     ```

4. **Scale the Server Application**:
   - Scaled the server (`express-app`) to 5 replicas:
     ```bash
     kubectl scale deployment express-app --replicas=5
     ```

5. **Expose the Client Application**:
   - Exposed the client service and accessed it using Minikube’s service URL:
     ```bash
     minikube service client-service --url
     ```

6. **Testing**:
   - Opened the provided URL in a browser to verify the client-server communication.

---

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
