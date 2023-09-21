const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
    {
        employeeName: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female"]
        },
    },
    { timestamps: true }
);
  
const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = employeeModel;