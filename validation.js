const Joi = require('@hapi/joi');


const validationInputCompany =  (data)=>{
    console.log(data)
    const schema = Joi.object({ 
        company_name: Joi.string().min(3).max(50).required(),
        telephone_number: Joi.string().min(8).max(16).allow('', null),
        address: Joi.string().min(10).max(50).allow('', null),
    });

    return  schema.validate(data)

}

const validationInputEmployee =  (data)=>{
    console.log(data)
    const schema = Joi.object({ 
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(255).email(),
        Phone_number: Joi.string().min(8).max(16).allow('', null),
        jobtitle: Joi.string().allow('', null)
    });

    return  schema.validate(data)

}




module.exports.validationInputCompany = validationInputCompany
module.exports.validationInputEmployee = validationInputEmployee
