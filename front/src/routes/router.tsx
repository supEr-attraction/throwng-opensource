import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./authRoutes";
import basicRoutes from "./basicRoutes";

const router = createBrowserRouter([authRoutes, basicRoutes]);

export default router;
