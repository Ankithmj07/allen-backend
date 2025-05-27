import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import CourseRoutes from "./routes/course.routes"
import StudentRoutes from "./routes/students.routes"
import Ordersrouter from "./routes/orders.routes";
import Adminrouter from './routes/admin.routes'
import Resultsrouter from './routes/results.routes'
import Testimonialrouter from'./routes/testimonials.routes'
import Contactrouter from "./routes/contact.routes";

config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/courses", CourseRoutes);
app.use("/api/student",StudentRoutes);
app.use("/api/orders",Ordersrouter)
app.use("/api/admin",Adminrouter)
app.use("/api/results",Resultsrouter)
app.use("/api/testimonials",Testimonialrouter)
app.use("/api/contact",Contactrouter)

export default app;