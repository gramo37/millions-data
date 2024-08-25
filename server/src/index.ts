import express from 'express';
import cors from "cors";
import route1 from "./routes/route1";
import route2 from "./routes/route2";

const app = express();
const port = 5000;

app.use(cors())

app.use("/api/v1", route1)
app.use("/api/v2", route2)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
