import { Router } from "express";
import { getGold } from "../services/goldServices.js";

const router = Router();

router.get('/', getGold);

export default router;
