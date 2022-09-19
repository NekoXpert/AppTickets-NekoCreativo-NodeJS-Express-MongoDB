import { Router } from "express";
import {
    renderEmpleoForm,
    createNewEmpleo,
    renderEmpleos,
    renderEditsForm,
    deleteEmpleo,
} from "../controllers/empleos.controller.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

// New Empleos
router.get("/empleos/add", isAuthenticated, renderEmpleoForm);

router.post("/empleos/new-empleo", isAuthenticated, createNewEmpleo);

// Get All Empleos
router.get("/empleos", isAuthenticated, renderEmpleos);

// Edit Empleos
router.get("/empleos/edit/:id", isAuthenticated, renderEditsForm);

// Delete Empleos
router.delete("/empleos/delete/:id", isAuthenticated, deleteEmpleo);

export default router;