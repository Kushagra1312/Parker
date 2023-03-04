var express = require('express');

const router = express.Router();

var { register, login } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);

module.exports = router;