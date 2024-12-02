Client-Server Application with React and Express
This project demonstrates a simple client-server application built using React for the frontend and Express for the backend. The application has been deployed in two different environments: first on virtual machines and second on a Kubernetes cluster using Minikube.

Architecture Overview
First Approach: Virtual Machines
In the first part of the exercise, the React client application and the Express server application were run on separate virtual machines. The virtual machines were set up to be on the same network, ensuring that the client could send HTTP requests to the server and receive responses.

Client (React): The React application was deployed and served on a virtual machine with a specific IP address.
Server (Express): The Express server was hosted on a second virtual machine.
Networking: The two virtual machines were configured to communicate over the same network, allowing the React client to interact with the Express server.
Second Approach: Kubernetes with Minikube
In the second part, Minikube was used to create a local Kubernetes cluster. Both the React client and the Express server were deployed on separate Kubernetes deployments.

Client (React): The React application was exposed using a NodePort service.
Server (Express): The Express server was exposed using a ClusterIP service.
Networking: The server was accessed locally using kubectl port-forward, mapping the Express service's port to a local port (3001). The React application could be accessed via a URL provided by Minikube's service.
Steps Followed
Part 1: Running on Virtual Machines
Set up two virtual machines, one for the React client and one for the Express server.
Ensure both virtual machines are on the same network.
Start the server on the Express virtual machine.
Start the client on the React virtual machine.
Test that the client can communicate with the server.
Part 2: Running on Minikube Cluster
Navigate to the directory liorsapp/config.
Start Minikube:
bash
Copy code
minikube start
Apply the Kubernetes configurations for the React and Express applications:
bash
Copy code
kubectl apply -f react.yaml
kubectl apply -f express.yaml
Port-forward the Express service to make it accessible on localhost:
bash
Copy code
kubectl port-forward service/express-service 3001:80
Scale the Express deployment to 5 replicas:
bash
Copy code
kubectl scale deployment express-app --replicas=5
Expose the React application using Minikube’s service URL:
bash
Copy code
minikube service react-app-service --url
Open the URL provided to access the React application.
