var express = require('express') // Web Framework
var app = express()
var sql = require('mssql') // MS Sql Server client
const mysql = require('mysql2/promise')
// Connection string parameters.
var sqlServerConfig = {
    user: 'sa',
    password: '123456',
    server: 'THUAN',
    database: 'HR',
    synchronize: true,
    trustServerCertificate: true
}
const mysqlConfig = {
    user: 'root',
    password: '',
    database: 'pay_roll',
    server: 'localhost'
}
const getSqlServerConnection = async () => {
    try {
        const db = await sql.connect({ ...sqlServerConfig })
        return db
    } catch (err) {
        console.log(err)
    }
}
const getMysqlConnection = async () => {
    const db = mysql.createConnection(mysqlConfig)
    return db
}
const closeConnection = async (whichDB, conn) => {
    switch (whichDB) {
        case 'MYSQL':
            conn.destroy()
        case 'SQLSERVER':
            conn.close()
    }
    return
}
module.exports = {
    getSqlServerConnection,
    getMysqlConnection
}
