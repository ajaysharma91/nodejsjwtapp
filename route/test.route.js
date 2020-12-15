const express = require("express");
const {userCreate, getUser , getUserById, userUpdate, deleteUser, login} = require("../controller/test.controller");
const route = express.Router();
// route.get("/getAll",controller.getList)
const {checkToken} = require('../auth/token_verification')
route.post("/",checkToken, userCreate);
route.get("/",checkToken, getUser);
route.get("/user/:id",checkToken, getUserById);
route.patch("/",checkToken,userUpdate);
route.delete("/user/:id",checkToken, deleteUser);
route.post("/login", login);

module.exports = route;