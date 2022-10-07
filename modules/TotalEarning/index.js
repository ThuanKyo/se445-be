const { response } = require('express')
var express = require('express')
var router = express.Router()
const { faker } = require('@faker-js/faker')
const sql = require('mssql')
const { getSqlServerConnection, getMysqlConnection } = require('../../databases/DB')
const { concat, groupBy, forEach, get, flatMapDepth, flatMap, keys } = require('lodash')
/* GET home page. */
const TotalEarningRouter = router => {
    router.get('/total-earning', async function (req, res, next) {
        const sqlServerConn = await getSqlServerConnection()
        const sqlEmployment = `
            select jh.Department, p.Employee_ID, p.First_Name, p.Last_Name, 
            p.Gender, p.Ethnicity, b.Deductable, e.Employment_Status
            from Personal p inner join Job_History jh on p.Employee_ID = jh.Employee_ID
            inner join Employment e on p.Employee_ID = e.Employee_ID 
            inner join Benefit_Plans b on p.Benefit_Plans = b.Benefit_Plan_ID
        `

        const mysqlConn = await getMysqlConnection()
        const sqlEmployee = `
            SELECT e.idEmployee AS Employee_ID, e.Vacation_Days, p.*, e.Paid_To_Date, e.Paid_Last_Year
            from employee e inner join pay_rates p on p.IdPay_Rates = e.PayRates_id
        `
        const groupByEmployee = {}
        const employments = await sqlServerConn.query(sqlEmployment)
        const [employees] = await mysqlConn.query(sqlEmployee)
        let data = concat(employees, employments.recordset)
        // res.send(data)
        forEach(data, (el, index) => {
            if (groupByEmployee[get(el, 'Employee_ID')]) {
                groupByEmployee[get(el, 'Employee_ID')] = { ...groupByEmployee[get(el, 'Employee_ID')], ...el }
            } else {
                groupByEmployee[get(el, 'Employee_ID')] = {}
                console.log(el)
                groupByEmployee[get(el, 'Employee_ID')] = { ...groupByEmployee[get(el, 'Employee_ID')], ...el }
            }
        })
        // keys(groupByEmployee).map(key => {
        //     return {
        //         key: { ...groupByEmployee[key], benefit_average: }
        //     }
        // })
        // data = groupBy(data, el => get(el, 'Employee_ID'))
        res.send(groupByEmployee)
    })
}

module.exports = TotalEarningRouter
