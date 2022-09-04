const { Router } = require('express');
const Yup = require('yup');

const router = new Router();

//? Yup
const schema = Yup.object().shape({
    fullname: Yup.string()
        .required("نام و نام خانوادگی الزامی میباشد")
        .min(4," نام و نام خانوادگی نباید کمتر از 4 کاراکتر باشد")
        .max(255,"نام و نام خانوادگی نباید بیشتر از 255 کاراکتر باشد"),
    email: Yup.string()
        .email("ایمیل معتبر نمیباشد")
        .required("ایمیل الزامی میباشد"),
    password: Yup.string()
        .required("کلمه عبور الزامی میباشد")
        .min(4,"کلمه عبور نباید کمتر از 4 کاراکتر باشد")
        .max(255,"کلمه عبور نباید بیشتر از 255 کاراکتر باشد"),
    confirmPassword: Yup.string()
        .required(" تکرار کلمه عبور الزامی میباشد")
        .oneOf([Yup.ref("password"),null])
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
    schema.validate(req.body).then((result) => {
        console.log(result);
        res.redirect("/users/login")
    }).catch((err) => {
        console.log(err.errors);
        res.render("register",{
            pageTitle: "ثبت نام کاربر",
            path: "/register",
            errors: err.errors
        });
    });
});

module.exports = router;