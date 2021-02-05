const { db, query } = require("../database");
const Crypto = require("crypto");
const { createJWTToken } = require("../helper/jwt");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
   // CRUD create read update delete
Register: (req, res) => {
   let { username, password, email } = req.body;
   let hashPassword = Crypto.createHmac("sha256", "kuncirahasia")
     .update(password)
     .digest("hex");

   let sql = `insert into users (username, password, roleId, email, verified) values('${username}', '${hashPassword}', 2 , '${email}', 0)`;
   db.query(sql, (err, insert) => {
     if (err) {
       res.status(500).send(err.message);
     } else {
       let sql = `select id, username, roleId, email, password, verified from users where id = ${insert.insertId}`;
       db.query(sql, (err, results) => {
         if (err) {
           res.status(500).send({
             status: "Failed",
             message: err.message,
           });
         }
         let { email, username, password } = results[0];
         let url = `http://localhost:3000/verify?username=${username}&password=${password}`;
         let mailOptions = {
           from: "Admin <lian.eddy@gmail.com>",
           to: email,
           subject: "Email Verification",
           html: `<p>Click <a href="${url}">Here</a> to Verify your account</p>`,
         };
         transporter.sendMail(mailOptions, (err, info) => {
           if (err) {
             res.status(500).send(err.message);
           }
           let token = createJWTToken({ ...results[0] });
           console.log(token);
           res.status(200).send({
             status: "Success",
             data: {
               ...results[0],
               token,
             },
             message: "Account Created!",
           });
         });
       });
     }
   });
 },

 Login: (req, res) => {
   let { username, password } = req.body;
   let hashPassword = Crypto.createHmac("sha256", "kuncirahasia");
   let sql = `select id, username, role, email, password, verified from users where username = '${username}' and password = '${hashPassword}'`;
   db.query(sql, (err, results) => {
     if (err) {
       res.status(500).send(err.message);
     }
     if (results.length !== 0) {
       console.log(results[0]);
       let token = createJWTToken({ ...results[0] });
       console.log(token);

       res.status(200).send({
         status: "Success",
         data: {
           ...results[0],
           token,
         },
         message: "Login Successful",
       });
     } else {
       res.status(404).send({
         status: "Not Found",
         message: "User not Found",
       });
     };
   });
 },

DeactiveAccount: (req, res) => {
  let { username, password, email } = req.body;
  let hashPassword = Crypto.createHmac("sha256", "kuncirahasia")
     let sql = `select id, username, role, email, password, verified from users where username = '${username}' and password = '${hashPassword}'`;
     db.query(sql, (err, results) => {
       if (err) {
         res.status(500).send(err.message);
       }
       if (results.length !== 0) {
         console.log(results[0]);
         res.status(200).send({
           status: "Deactived",
           data: {
             ...results[0],
           },
           message: "Deactive Successful"
         });
       } else {
         res.status(404).send({
           status: "Not Found",
           message: "User not Found",
         });
       };
     });
   },

ActivateAccount: (req, res) => {
  let { username, password } = req.body;
   let hashPassword = Crypto.createHmac("sha256", "kuncirahasia");
   let sql = `select id, username, role, email, password, verified from users where username = '${username}' and password = '${hashPassword}'`;
   db.query(sql, (err, results) => {
     if (err) {
       res.status(500).send(err.message);
     }
     if (results.length !== 0) {
       console.log(results[0]);
       let token = createJWTToken({ ...results[0] });
       console.log(token);

       res.status(200).send({
         status: "Success",
         data: {
           ...results[0],
           token,
         },
         message: "Activate Successful",
       });
     } else {
       res.status(404).send({
         status: "Not Found",
         message: "User not Found",
       });
     };
   });
 },

CloseAccount: (req, res) => {
let { username, password, email } = req.body;
let hashPassword = Crypto.createHmac("sha256", "kuncirahasia")
   let sql = `delete id, username, role, email, password, verified from users where username = '${username}' and password = '${hashPassword}'`;
   db.query(sql, (err, results) => {
     if (err) {
       res.status(500).send(err.message);
     }
     if (results.length !== 0) {
       console.log(results[0]);
       res.status(200).send({
         status: "Deleted",
         data: {
           ...results[0],
         },
         message: "Delete Successful",
       });
     } else {
       res.status(404).send({
         status: "Not Found",
         message: "User not Found",
       });
     };
   });
 },
}
