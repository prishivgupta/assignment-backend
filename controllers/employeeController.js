const { body, validationResult } = require("express-validator");
const employeeModel = require("../models/employeeModel");

module.exports.addEmployee = [

    body("employeeName").not().isEmpty(),
    body("designation").not().isEmpty(),
    body("gender").not().isEmpty(),

    async (req, res) => {
  
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const { employeeName, designation, gender } = req.body;
  
        try {

            const employee = await employeeModel.create({ employeeName, designation, gender });

            res.status(201).json({ employee: employee, message: "Successfully Added Employee" });
            
        }
    
        catch (err) {
    
            let error = err.message;
            res.status(400).json({ error: error });
    
        }
  
    }
  
]

module.exports.editEmployee = [

    body("employeeId").not().isEmpty(),
    body("employeeName").not().isEmpty(),
    body("designation").not().isEmpty(),
    body("gender").not().isEmpty(),

    async (req, res) => {
  
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const { employeeId, employeeName, designation, gender } = req.body;
  
        try {

            const employee = await employeeModel.findOneAndUpdate({ _id: employeeId }, { employeeName, designation, gender });

            if (employee) {
                res.status(201).json({ employee: employee, message: "Successfully Edited employee" });
            } else {
                res.status(400).json({ error: { message: "Employee Doesnt exist" } });
            }
            
        }
    
        catch (err) {
    
            let error = err.message;
            res.status(400).json({ error: error });
    
        }
  
    }
  
]

module.exports.deleteEmployee = async (req, res) => {
  
    try {

        const employee = await employeeModel.findOneAndDelete({ _id: req.params.id });

        if (employee) {
            res.status(201).json({ employee: employee, message: "Successfully Deleted employee" });
        } else {
            res.status(400).json({ error: { message: "Employee Doesnt exist" } });
        }
        
        
    }

    catch (err) {

        let error = err.message;
        res.status(400).json({ error: error });

    }

}

module.exports.getEmployeeById = async (req, res) => {
  
    try {

        const employee = await employeeModel.findOne({ _id: req.params.id });

        if (employee) {
            res.status(201).json({ employee: employee, message: "Employee Details fetched Successfully" });
        } else {
            res.status(400).json({ error: { message: "Employee Doesnt exist" } });
        }
        
    }

    catch (err) {

        let error = err.message;
        res.status(400).json({ error: error });

    }

}

module.exports.getAllEmployees = async (req, res) => {
  
    try {

        let page = parseInt(req.query.page) || 1;
        let pageSize = parseInt(req.query.pageSize) || 10;
        let skip = (page - 1) * pageSize;
        
        let count = await employeeModel.countDocuments({ 
        });

        const employees = await employeeModel.find({ 
        })
        .skip(skip)
        .limit(pageSize);
        
        res.status(201).json({ count, page, pages: Math.ceil(count / pageSize), employees: employees, message: "Employees fetched Successfully" });
        
    }

    catch (err) {

        let error = err.message;
        res.status(400).json({ error: error });

    }

}