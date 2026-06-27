import { Router } from "express";

import {validateBody} from '../middleware/validations';
import {z} from 'zod';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
});

const router = Router();

router.post("/login", validateBody(loginSchema), (req, res) => {
    res.status(200).json({ message: "User logged in successfully" });
});
/* JSON de prueba para login
{
  "email": "bob@example.com",
  "password": "bobmaster"
}*/

router.post("/register", validateBody(registerSchema), (req, res) => {
    res.status(201).json({ message: "User registered successfully" });
});
/* JSON de prueba para register
{
  "name": "Bob son",
  "email": "bob@example.com",
  "password": "bobmaster"
}*/

export default router;