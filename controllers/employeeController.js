
import Employee from "../models/employeeModel.js"

// CREATE employee.........

export const createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      age,
      department,
      position,
      salary,
    } = req.body;

    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(400).json({
        message: "Employee with this email already exists",
      });
    }

    const employee = await Employee.create({
      name,
      email,
      phone,
      age,
      department,
      position,
      salary,
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create employee",
      error: error.message,
    });
  }
};

// GET all employees..........

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    res.status(200).json({
      message: "Employees fetched successfully",
      employees,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch employees",
      error: error.message,
    });
  }
};


// GET employee by ID (specific emplyee)

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee fetched successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch employee",
      error: error.message,
    });
  }
};


// UPDATE employee............

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update employee",
      error: error.message,
    });
  }
};


// DELETE employee..............

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete employee",
      error: error.message,
    });
  }
};


// Department statistics.......

export const getDepartmentStats = async (req, res) => {
  try {
    const stats = await Employee.aggregate([
      {
        $group: {
          _id: "$department",   // Group the employees based on their department.

          employeeCount: {
            $sum: 1,          // Count how many documents are in this group. which will be also equal to number of emp in each group , 
          },

          averageSalary: {
            $avg: "$salary",   // Calculate the average of the salary field for all documents inside each group.
          },

          totalSalary: {
            $sum: "$salary",    // means add all the salary values inside each group.
          },
        },
      },
      {
        $sort: {
          averageSalary: -1,    // Sort the groups based on averageSalary, from highest to lowest.
        },
      },
    ]);

    res.status(200).json({
      message: "Department statistics fetched successfully",
      stats,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch department statistics",
      error: error.message,
    });
  }
};


//  Highest-paid employees...............

export const getHighestPaidEmployees = async (req, res) => {
  try {
    const employees = await Employee.aggregate([
      {
        $sort: {
          salary: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json({
      message: "Highest paid employees",
      employees,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch employees",
      error: error.message,
    });
  }
};


//  Employees by department...........

export const getEmployeesByDepartment = async (req, res) => {
  try {
    const { department } = req.params;

    const employees = await Employee.aggregate([
      {
        $match: {
          department: department,
        },
      },
    ]);

    res.status(200).json({
      message: "Employees fetched successfully",
      employees,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch employees",
      error: error.message,
    });
  }
};

// Salary statistics...........

export const getSalaryStats = async (req, res) => {
  try {
    const stats = await Employee.aggregate([
      {
        $group: {
          _id: null,

          minimumSalary: {
            $min: "$salary",
          },

          maximumSalary: {
            $max: "$salary",
          },

          averageSalary: {
            $avg: "$salary",
          },

          totalSalary: {
            $sum: "$salary",
          },
        },
      },
    ]);

    res.status(200).json({
      message: "Salary statistics fetched successfully",
      stats,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch salary statistics",
      error: error.message,
    });
  }
};

//
