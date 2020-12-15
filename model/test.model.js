const pool = require('../config/database');

module.exports = {
    create: (data, callback) =>{
        console.log(data);
        pool.query(`insert into testuser (name,password,email) values(?,?,?)`,
        [data.name, data.password, data.email], (error, results, fields) => {
            if(error)
            return callback(error)
            console.log(error)
            return callback(null, results);

        });
    },

    getUser: callback => {
        pool.query(`
            select * from testuser
        `,[], (error, results, fields)=>{
            if(error)
            return callback(error)
            return callback(null, results)
        })
    },
    getUserById: (data,callback) => {
        pool.query(`
            select * from testuser where id = ?
        `,[data], (error, results, fields)=>{
            if(error)
            return callback(error)
            return callback(null, results)
        })
    },
    update: (data, callback) =>{
        console.log(data);
        pool.query(`update testuser set name = ?, password = ? where id=?`,
        [data.name, data.password, data.id], (error, results, fields) => {
            if(error)
            return callback(error)
            console.log(error)
            return callback(null, results);

        });
    },
    deleteUser: (data, callback) =>{
        pool.query(`delete from testuser where id =?`, 
        [data], (error, results, fields) =>{
            if(error)
            return callback(error);
            return callback(null, results);
        })
    },
    getUserByEmail: (data,callback) => {
        pool.query(`
            select * from testuser where email = ?
        `,[data.email], (error, results, fields)=>{
            if(error)
            return callback(error)
            return callback(null, results[0])
        })
    },
}