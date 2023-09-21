const { Router } = require("express");
const { getAllEmployees, getEmployeeById, addEmployee, editEmployee, deleteEmployee } = require("../controllers/employeeController");
const employeeRoutes = Router();

employeeRoutes.get("/getAllEmployees", getAllEmployees);
employeeRoutes.get("/getEmployeeById/:id", getEmployeeById);
employeeRoutes.post("/addEmployee", addEmployee);
employeeRoutes.put("/editEmployee", editEmployee);
employeeRoutes.delete("/deleteEmployee/:id", deleteEmployee);

module.exports = employeeRoutes;