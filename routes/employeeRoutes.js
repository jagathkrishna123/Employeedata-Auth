
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

router.get( "/stats/departments", authMiddleware, allowRoles("admin", "hr"), getDepartmentStats );

router.get( "/stats/salary", authMiddleware, allowRoles("admin", "hr"), getSalaryStats );

router.get( "/stats/highest-paid", authMiddleware, allowRoles("admin", "hr"), getHighestPaidEmployees );

router.get( "/department/:department", authMiddleware, allowRoles("admin", "hr"), getEmployeesByDepartment );

//...............................................................................................


router.get( "/", authMiddleware, allowRoles("admin", "hr"), getAllEmployees );

router.get( "/:id", authMiddleware, allowRoles("admin", "hr"), getEmployeeById );



router.post( "/", authMiddleware, allowRoles("admin"), createEmployee );

router.put("/:id", authMiddleware,  allowRoles("admin"), updateEmployee );

router.delete( "/:id", authMiddleware, allowRoles("admin"), deleteEmployee );


export default router;