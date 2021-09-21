const models = require("../models");
const {validationInputEmployee} = require('../validation.js');


const createEmployee = async (req,res,next) =>{

    const {error} = validationInputEmployee(req.body);
    if(error) {
        res.status(400).send({
            status: 400,
            code: "400",
            data: null,
            message: error.details[0].message
        });
    }else{
        let checkEmail =await  models.Employee.findOne({ where: {	email: req.body.email} })
        if(checkEmail){
            res.status(409).send({
                status: 409,
                code: "409",
                data: null,
                message: "Email already exist"
            });
        }else{
            const employee = 
            {
                name: req.body.name,
                email: req.body.email,
                Phone_number: req.body.Phone_number,
                jobtitle: req.body.jobtitle ? req.body.jobtitle : 'staff',
                company_id : req.params.company_id
            }
            models.Employee.create(employee)
            .then(result =>{
                 res.status(200).send({
                    status: 200,
                    code: "200",
                    data: {
                        id: result.id,
                        company_id : req.params.company_id
                    },
                    message: "Success"
                });
            }).catch(err =>{
                res.status(500).send({
                    status: 500,
                    code: "500",
                    data: null,
                    message: err.message || "Error"
                });
            })
            
        }

    
    }
}

const getAlldataEmployee = async (req,res,next) =>{

    models.Employee.findOne({ where: { company_id: req.params.id} })
    .then(result =>{
        if(result){
            res.status(200).send({
                status:200,
                code : "200",
                data: {
                    id:result.id,
                    name: result.name,
                    phone_number: result.id.Phone_number,
                    jobtitle: result.jobtitle
                },
                message: "Success !",
            })

        }else{
            res.status(422).send({
                status: 422,
                code: "422",
                data: null,
                message: "Data is not found"
            })
        }
    
    }).catch(err =>{
        res.status(500).send({
            status: 500,
            code: "500",
            data: null,
            message: err.message || "Error"
        });
    });


}

const updateDataEmployee = async (req,res,next) =>{

    models.Employee.findOne({ where: { id: req.params.employee_id, company_id: req.params.company_id } })
    .then(async (result) =>{
        if(result){
            if(result.email === req.body.email){
                result.name = req.body.name;
                result.email = req.body.email;
                result.Phone_number = req.body.Phone_number;
                result.jobtitle = req.body.jobtitle;

                result.save()
                .then(() =>{
                    res.status(200).send({
                        status: 200,
                        code: "200",
                        data: {
                            id: req.params.employee_id,
                            company_id : req.params.company_id
                        },
                        message: "Success"
                    });
                }).catch ( err =>{
                    res.status(500).send({
                        status: 500,
                        code: "500",
                        data: null,
                        message: err.message || "Error"
                    });
                });
            
            }else{
                let checkEmail = await models.Employee.findOne({ where: {	email: req.body.email} })
                if(checkEmail){
                    res.status(409).send({
                        status: 409,
                        code: "409",
                        data: null,
                        message: "Email already exist"
                    });
                }else {
                    result.name = req.body.name;
                    result.email = req.body.email;
                    result.Phone_number = req.body.Phone_number;
                    result.jobtitle = req.body.jobtitle;
    
                    result.save()
                    .then(() =>{
                        res.status(200).send({
                            status: 200,
                            code: "200",
                            data: {
                                id: req.params.employee_id,
                                company_id : req.params.company_id
                            },
                            message: "Success"
                        });
                    }).catch ( err =>{
                        res.status(500).send({
                            status: 500,
                            code: "500",
                            data: null,
                            message: err.message || "Error"
                        });
                    });
                }
            }

        }else{
            res.status(422).send({
                status: 422,
                code: "422",
                data: null,
                message: "Data is not found"
            })
        }
    
    }).catch(err =>{
        res.status(500).send({
            status: 500,
            code: "500",
            data: null,
            message: err.message || "Error"
        });
    });


}

const removeDataEmployee = async (req, res, next) =>{
    models.Employee.findByPk(req.params.id)
    .then(result =>{
        if(result){
            result.destroy().then(()=>{
                res.status(200).send({
                    status: 200,
                    code: "200",
                    message: "suceess"
                })
            }).catch(err => {
                es.status(500).send({
                    status: 500,
                    code: "500",
                    data: null,
                    message: err.message || "Error"
                });
            });
        }
    }).catch(err =>{
        res.status(500).send({
            status: 500,
            code: "500",
            data: null,
            message: err.message || "Error"
        });
    });;
    

}


module.exports = {
    createEmployee,
    getAlldataEmployee,
    updateDataEmployee,
    removeDataEmployee
}