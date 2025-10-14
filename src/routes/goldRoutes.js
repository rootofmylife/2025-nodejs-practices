import { Router } from "express";
import { z } from 'zod';

import { getGold } from "../services/goldServices.js";
import { validateBody } from "../middlewares/validation.js";

const getGoldSchema = z.object({
    gold: z.number().positive(),
});

const router = Router();

// Middleware
router.use(validateBody(getGoldSchema));

router.get('/', getGold);

export default router;
