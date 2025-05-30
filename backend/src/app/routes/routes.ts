import express from "express";
import { authRoutes } from "../modules/auth/auth.routes"; 

const router = express.Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: authRoutes
    }, 

]



moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
