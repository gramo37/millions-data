import { Typography } from "@mui/material";
import BasicTable from "./components/Table";
import useWorker from "./hooks/useWorker";
import { useEffect } from "react";

function App() {
  const { workerResult, postMessage } = useWorker<String, any[]>(
    new URL("http://localhost:3000/worker2.js", import.meta.url).toString()
  );
  const data = workerResult;

  useEffect(() => {
    // Start fetching data
    postMessage("start");
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
