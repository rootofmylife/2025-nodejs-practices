import { z } from 'zod';

export const validateBody = (schema) => {
  return (req, res, next) => {
    try {
        const result = schema.parse(req.body);
        req.body = result;
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
  };
};