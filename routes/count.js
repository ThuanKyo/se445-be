const { response } = require('express')
var express = require('express')
var router = express.Router()
const { getConnection2 } = require('../databases/db2')
const { faker } = require('@faker-js/faker')
const sql = require('mysql')
/* GET home page. */
router.get('/payrollemployees', async function (req, res, next) {
    getConnection2().then(db2 => {
        db2.query('Select *From employees')
            .then(result => {
                res.send(result)
            })
            .catch(err => {
                console.log(err)
            })
    })
})

module.exports = router
