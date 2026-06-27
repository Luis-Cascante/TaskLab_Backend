import { Router } from "express";

import {validateBody, validateParams, validateQuery} from '../middleware/validations';
import {z} from 'zod';

const createTaskSchema = z.object({
    title: z.string(),
    employer_id: z.string().uuid(),
    description: z.string(),
    location: z.string(),
    category_id: z.string().uuid(),
    agreement_id: z.string().uuid()
});

const updateTaskSchema = createTaskSchema;

const partialUpdateTaskSchema = createTaskSchema.partial();

const searchTaskIdSchema = z.object({
    id: z.string().uuid().optional()
});

const searchTaskCategorySchema = z.object({
    category_id: z.string().uuid().optional()
});

const searchTaskAgreementSchema = z.object({
    agreement_id: z.string().uuid().optional()
});

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({ message: "List of tasks" });
});

router.get("/:id", validateParams(searchTaskIdSchema), (req, res) => {
    res.status(200).json({ message: `Details of task with id ${req.params.id}` });
});
/*
id de prueba usado como parametro en la ruta, debe ser un UUID válido, este es de prueba
123e4567-e89b-12d3-a456-426614174000
*/

router.get("/category/:id", validateParams(searchTaskCategorySchema), (req, res) => {
    res.status(200).json({ message: `Details of task with category id ${req.params.category_id}` });
});
/*
id de prueba usado como parametro en la ruta, debe ser un UUID válido, este es de prueba
123e4567-e89b-12d3-a456-426614174000
*/

router.get("/agreement/:id", validateParams(searchTaskAgreementSchema), (req, res) => {
    res.status(200).json({ message: `Details of task with agreement id ${req.params.agreement_id}` });
});
/*
id de prueba usado como parametro en la ruta, debe ser un UUID válido, este es de prueba
123e4567-e89b-12d3-a456-426614174000
*/

router.post("/", validateBody(createTaskSchema), (req, res) => {
    res.status(201).json({ message: "Task created successfully" });
});
/*  Json de prueba, los id de employer_id, category_id y agreement_id 
deben ser UUID válidos, estos son de prueba
{
  "title": "p1",
  "employer_id": "123e4567-e89b-12d3-a456-426614174000",
  "description": "d1",
  "location": "l1",
  "category_id": "123e4567-e89b-12d3-a456-426614174001",
  "agreement_id": "123e4567-e89b-12d3-a456-426614174002"
}
*/


router.put("/:id", validateParams(searchTaskIdSchema), validateBody(updateTaskSchema), (req, res) => {
    res.status(200).json({ message: `Task with id ${req.params.id} updated successfully` });
});
/*
id de prueba usado como parametro en la ruta, debe ser un UUID válido, este es de prueba
123e4567-e89b-12d3-a456-426614174000

para probar utilizar el mismo json de prueba que en la ruta POST
*/

router.patch("/:id", validateParams(searchTaskIdSchema), validateBody(partialUpdateTaskSchema), (req, res) => {
    res.status(200).json({ message: `Task with id ${req.params.id} partially updated successfully` });
});
/*
id de prueba usado como parametro en la ruta, debe ser un UUID válido, este es de prueba
123e4567-e89b-12d3-a456-426614174000

para probar utilizar el mismo json de prueba que en la ruta POST
*/

router.delete("/:id", validateParams(searchTaskIdSchema), (req, res) => {
    res.status(200).json({ message: `Task with id ${req.params.id} deleted successfully` });
});
/*
id de prueba usado como parametro en la ruta, debe ser un UUID válido, este es de prueba
123e4567-e89b-12d3-a456-426614174000
*/

export default router;