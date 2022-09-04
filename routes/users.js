const { Router } = require('express');
const Yup = require('yup');

const router = new Router();

//? Yup
const schema = Yup.object().shape({
    fullname: Yup.string().required().min(4).max(255),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(4).max(255),
    confirmPassword: Yup.string().required().oneOf([Yup.ref("password"),null])
});

// @Desc   Login Page
// @Route  GET /users/login
router.get("/login",(req,res) => {
    res.render("login",{
        pageTitle: " ورود به بخش مدیریت ",
        path: "/login",
    });
});

// @Desc   Register Page
// @Route  GET /users/register
router.get("/register",(req,res) => {
    res.render("register",{
        pageTitle: " ثبت نام کاربر جدید",
        path: "/register",
    });
});

// @Desc   Register Handle
// @Route  POST /users/register
router.post("/register",(req,res) => {
    // const validator = schema.isValid(req.body);
    // validator.then((result) => {
    //     console.log(result);
    //     res.send("all good");
    // }).catch((ex) => {
    //     console.log(ex);
    //     res.send("error");
    // });
    schema.validate(req.body).then((result) => {
        console.log(result);
        res.send("all good");
    }).catch((err) => {
        console.log(err);
        res.send("error",{errors: err.errors});
    });
});

module.exports = router;