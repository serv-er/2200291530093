import express from "express";
import getNumbers from "../controllers/numbersController.js";

const router = express.Router();
router.get("/:type", getNumbers);

export default router;
