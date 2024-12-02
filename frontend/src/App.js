import React, { useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const server_url = "http://192.168.39.34:30546/"
  //minikube ip + nodeport of express service + route"

  const server_url2 = "http://localhost:3001/notes/hi";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(server_url2);
      const result = await response.json();
      setData(result);
    } catch (error) {
      setData(error);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div><center>
      <h1>Lior's exercise</h1>
      <h2><button onClick={fetchData}>Get Data</button> </h2>
      {loading && <p>Loading...</p>}
      {data && (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}</center>
    </div>
  );
}

export default App;
