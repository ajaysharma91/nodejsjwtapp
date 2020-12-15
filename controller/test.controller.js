
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { create, getUser,getUserById, update, deleteUser, getUserByEmail } = require("../model/test.model");
// exports.getList = (req, res) =>{
//     res.send({
//         "name":"ajay sharma",
//         "email":"ajparahs"
//     })
// }

const {sign}  = require('jsonwebtoken');
module.exports = {
    userCreate: (req,res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err.message
                })
            }

            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },

    getUserById: (req, res) =>{
        const id = req.params.id;
        console.log(id)
        getUserById(id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    message: err.message
                })
            }
            console.log(results)
            res.status(200).json({
                success:1,
                data:results
            })
        })
    },
    getUser: (req,res) =>{
        getUser((err, results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message: err.message
                })
            }
            if(!results){
                return res.status(500).json({
                    success:0,
                    message: "result not found"
                })
            }
            res.status(200).json({
                success:1,
                data:results
            })
        })
    },
    userUpdate: (req,res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        update(body, (err, results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message: err.message
                })
            }
            res.status(200).json({
                success:1,
                message:"Updated Successfully"
            })
        })
    },

    deleteUser:(req, res)=>{
        const id = req.params.id;
        deleteUser(id, (err, results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message: err.message
                })
            }
            res.status(200).json({
                success:1,
                message:"Deleted Successfully"
            })
        })
    },
    login:(req, res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
      //  body.password = hashSync(body.password, salt);
        getUserByEmail(body, (err, results) =>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message: err.message
                })
            }
            if(!results){
                return res.status(500).json({
                    success:0,
                    message: "Invalid Email or Password"
                })
            }

            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({result:results},"quew1234",{
                    expiresIn:"1h"
                })

                return res.json({
                    success:1,
                    message:"Login Successfully",
                    token:jsontoken
                })
            }
            else{
                return res.status(500).json({
                    success:0,
                    message: "Invalid Email or Password"
                })
            }
        })
    }
}