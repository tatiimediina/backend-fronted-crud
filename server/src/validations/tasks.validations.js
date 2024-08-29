import { body, param } from "express-validator";

export const validateAddTask = [
  body("title")
    .isString()
    .withMessage("title debe ser un string")
    .withMessage("title no debe ser vacio")
    .isLength({ max: 255 })
    .withMessage("El título debe tener un máximo de 255"),
  body("description")
    .isString()
    .withMessage("La descripción debe ser un string"),
  body("isComplete")
    .isBoolean()
    .withMessage("isComplete debe ser booleano")
    .withMessage("isComplete no puede estar vació"),
];

export const validateEditTask = [
  body("title")
    .optional()
    .isString()
    .withMessage("El titulo debe ser un string")
    .isLength({ max: 255 })
    .withMessage("El título debe tener un máximo de 255"),
  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser un string"),
  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("isComplete debe ser booleano"),
];
export const validateIdTask =[
    param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero")
]