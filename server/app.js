import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { PORT } from './src/settings/environments.js';
import { tasksRouter } from './src/routes/tasks.routes.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Corregido aquí

app.use("/tasks", tasksRouter);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
