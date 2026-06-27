import { Router } from "express";

import {validateBody, validateParams, validateQuery} from '../middleware/validations';
import {z} from 'zod';

const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
});

const updateUserSchema = userSchema;

const partialUpdateUserSchema = userSchema.partial();

const searchUserIdSchema = z.object({
    id: z.string().uuid()
});

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({ message: "List of users" });
});

router.get("/:id", validateParams(searchUserIdSchema), (req, res) => {
    res.status(200).json({ message: `Details of user with id ${req.params.id}` });
});
/*
id de prueba usado como parametro en la ruta, debe ser un UUID válido, este es de prueba
123e4567-e89b-12d3-a456-426614174000
*/

router.post("/", validateBody(userSchema), (req, res) => {
    res.status(201).json({ message: "User created successfully" });
});
//Esta ruta realmente no se si realmente sirve, ya que los usuarios se crean con register

router.put("/:id", validateParams(searchUserIdSchema), validateBody(updateUserSchema), (req, res) => {
    res.status(200).json({ message: `User with id ${req.params.id} updated successfully` });
});

router.patch("/:id", validateParams(searchUserIdSchema), validateBody(partialUpdateUserSchema), (req, res) => {
    res.status(200).json({ message: `User with id ${req.params.id} partially updated successfully` });
});

router.delete("/:id", validateParams(searchUserIdSchema), (req, res) => {
    res.status(200).json({ message: `User with id ${req.params.id} deleted successfully` });
});

export default router;