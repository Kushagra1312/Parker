const express = require("express");
const formidable = require("express-formidable");

const router = express.Router();

const { requireSignin } = require("../middlewares");
const { create } = require("../controllers/spot");

router.post('/create-spot', requireSignin, formidable(), create);

module.exports = router;