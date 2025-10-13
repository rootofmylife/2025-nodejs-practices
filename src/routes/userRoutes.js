import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, patchUser, deleteUser } from "../services/userServices.js";

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.patch('/:id', patchUser);
router.delete('/:id', deleteUser);

export default router;