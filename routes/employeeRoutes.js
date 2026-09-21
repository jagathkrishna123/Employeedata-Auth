import express from "express";

import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getDepartmentStats,
  getHighestPaidEmployees,
  getEmployeesByDepartment,
  getSalaryStats,
} from "../controllers/employeeController.js";

const router = express.Router();

// Aggregation / special routes FIRST
router.get("/stats/departments", getDepartmentStats);

router.get("/stats/salary", getSalaryStats);

router.get("/stats/highest-paid", getHighestPaidEmployees);

router.get("/department/:department", getEmployeesByDepartment);

// CRUD
router.post("/", createEmployee);

router.get("/", getAllEmployees);

router.get("/:id", getEmployeeById);

router.put("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

export default router;