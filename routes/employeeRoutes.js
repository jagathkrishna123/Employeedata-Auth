// import express from "express";

// import {
//   createEmployee,
//   getAllEmployees,
//   getEmployeeById,
//   updateEmployee,
//   deleteEmployee,
//   getDepartmentStats,
//   getHighestPaidEmployees,
//   getEmployeesByDepartment,
//   getSalaryStats,
// } from "../controllers/employeeController.js";
// import authMiddleware from "../middleware/authMiddleware.js";
// import allowRoles from "../middleware/roleMiddleware.js";

// const router = express.Router();

// // Aggregation / special routes FIRST
// router.get("/stats/departments", getDepartmentStats);

// router.get("/stats/salary", getSalaryStats);

// router.get("/stats/highest-paid", getHighestPaidEmployees);

// router.get("/department/:department", getEmployeesByDepartment);

// // CRUD
// router.post(
//   "/",
//   authMiddleware,
//   allowRoles("admin"),
//   createEmployee
// );
// router.get("/", getAllEmployees);

// router.get("/:id", getEmployeeById);

// router.put("/:id", updateEmployee);

// router.delete("/:id", deleteEmployee);

// export default router;



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

import authMiddleware from "../middleware/authMiddleware.js";
import allowRoles from "../middleware/roleMiddleware.js";

const router = express.Router();


// ===============================
// GET ROUTES
// Admin + HR
// ===============================

router.get(
  "/stats/departments",
  authMiddleware,
  allowRoles("admin", "hr"),
  getDepartmentStats
);

router.get(
  "/stats/salary",
  authMiddleware,
  allowRoles("admin", "hr"),
  getSalaryStats
);

router.get(
  "/stats/highest-paid",
  authMiddleware,
  allowRoles("admin", "hr"),
  getHighestPaidEmployees
);

router.get(
  "/department/:department",
  authMiddleware,
  allowRoles("admin", "hr"),
  getEmployeesByDepartment
);

router.get(
  "/",
  authMiddleware,
  allowRoles("admin", "hr"),
  getAllEmployees
);

router.get(
  "/:id",
  authMiddleware,
  allowRoles("admin", "hr"),
  getEmployeeById
);


// ===============================
// MODIFY ROUTES
// Admin only
// ===============================

router.post(
  "/",
  authMiddleware,
  allowRoles("admin"),
  createEmployee
);

router.put(
  "/:id",
  authMiddleware,
  allowRoles("admin"),
  updateEmployee
);

router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin"),
  deleteEmployee
);


export default router;