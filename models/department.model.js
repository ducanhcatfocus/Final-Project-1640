const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    department_name: String
})

module.exports = mongoose.model('department', DepartmentSchema);