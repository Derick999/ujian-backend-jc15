const express = require("express");
const router = express.Router();
const { userController } = require("../controller");
const db = require("../database");
const { auth } = require("../helper/jwt");
const {
   Register,
   Login,
   DeactiveAccount,
   ActivateAccount,
   CloseAccount
} = userController;
router.post("/users/register", Register); 
router.post("/users/login", Login);
router.patch('/users/deactive-account', DeactiveAccount);
router.patch('/users/activate-account', ActivateAccount);
router.patch('/usser/close-account', CloseAccount);

module.export = router;