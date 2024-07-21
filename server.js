import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import referralRoutes from "./routes/referralRoutes.js";
import errorHandlers from "./middleware/errorMiddleware.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use(referralRoutes);
app.use(errorHandlers.notFound);
app.use(errorHandlers.errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
