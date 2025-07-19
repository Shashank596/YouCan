import validator from "validator" ;
export const validate = (data) => {
   const mandatoryField = ['firstName', 'emailId', 'password' ];

   const isAllowed = mandatoryField.every((k) => Object.keys(data).includes(k));

   if (!isAllowed)
    throw new Error ("Some field is Missing ");

   if (!validator.isEmail(data.emailId))
    throw new Error ("Invalid Email");

   if (!validator.isStrongPassword(data.password))
     throw new Error("please enter a strong password ");
    
}