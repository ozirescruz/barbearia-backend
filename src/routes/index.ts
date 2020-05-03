import { Router } from "express";
import appoitmentsRouter from "./appoitments.route";

const routes = Router();

routes.use("/appoitments", appoitmentsRouter);

export default routes;
