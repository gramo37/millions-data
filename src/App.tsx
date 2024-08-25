import { Typography } from "@mui/material";
import BasicTable from "./components/Table";
import useWorker from "./hooks/useWorker";
import { useEffect } from "react";

function App() {
  const { workerResult, postMessage } = useWorker<String, any[]>(
    new URL("http://localhost:3000/worker.js", import.meta.url).toString()
  );
  const data = workerResult;

  useEffect(() => {
    // Start fetching data
    postMessage("Start Fetching!!");
  }, [postMessage]);

  return (
    <div className="App">
      <Typography variant="h3" sx={{ margin: "10px" }}>
        Basic Table
      </Typography>
      <BasicTable data={data} />
    </div>
  );
}

export default App;
