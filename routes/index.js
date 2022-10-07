const { response } = require('express')
var express = require('express')
var router = express.Router()
const { getSqlServerConnection } = require('../databases/DB')
const { faker } = require('@faker-js/faker')
const sql = require('mssql')
const TotalEarningRouter = require('../modules/TotalEarning')
/* GET home page. */

TotalEarningRouter(router)

module.exports = router
