import { body, validationResult } from "express-validator";

function userRegisterValidations() {
    return [
        body('firstName', "First name is Required ").notEmpty().isLength({ min: 2, max: 30 }),
        body('lastName', "Last name is Required ").notEmpty().isLength({ min: 2, max: 30 }),
        body('email', "Email is Required ").isEmail(),
        body('mobileNumber', "Mobile Number is Required ").isMobilePhone(),
        body('password', "Password should be Min 8 Characters, Atleast 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character").isStrongPassword(),
        body("password2").custom((value, { req }) => {
            if (!value || value !== req.body.password) {
                throw new Error("Password & Confirm Password do not match");
            }
            return true;
        })
    ]
}


function errorMiddleware(req, res, next) {
    const errors = validationResult(req);
    //Condition for not Empty
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validations Failed',
            status: false,
            errors: errors.array()
        })
    }
    return next();
}

function userLoginValidation(){
    return [
        body(`email`, "Email Id is Required").isEmail(),
        body(`password`,"Password should be Min 8 Characters, Atleast 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character").isStrongPassword()
    ]
}


function errorMiddlewareForLogin(req, res, next) {
    const Loginerrors = validationResult(req); // Corrected variable name
    // Condition for not Empty
    if (!Loginerrors.isEmpty()) {
        return res.status(400).json({
            message: 'Validations Failed',
            status: false,
            errors: Loginerrors.array()
        });
    }
    return next();
}


export { userRegisterValidations, errorMiddleware, userLoginValidation,  errorMiddlewareForLogin };