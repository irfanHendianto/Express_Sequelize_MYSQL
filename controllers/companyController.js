const models = require("../models");
const {validationInputCompany} = require('../validation.js');

const getAlldata = async (req,res,next) =>{
    const count = await models.Company.count()
    const Company = await models.Company.findAll({})
    .then(result =>{
        if(result){
            res.status(200).send({
                status:200,
                code : "200",
          
                data: {
                    count: count,
                    rows: [
                        result
                    ]
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
        res.status(400).send({
            status: 400,
            code: "400",
            data: null,
            message: err.message || "Data is not found"
        });
    });


}
const createCompany = async (req,res,next) =>{
    const {error} = validationInputCompany(req.body);
    // res.send(error)
    if(error) {
        res.status(400).send({
            status: 400,
            code: "400",
            data: null,
            message: error.details[0].message
        });
    }else{
        const company = 
        {
            company_name:  req.body.company_name,
            telephone_number: req.body.telephone_number,
            is_active: req.body.is_active ? req.body.company_name : false,
            address: req.body.address,
        }
    
        models.Company.create(company)
        .then(result =>{
             res.status(200).send({
                status: 200,
                code: "200",
                data: {result : result},
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


const updateCompany = async (req,res,next) =>{
    const project = await models.Company.findByPk(req.params.id)
    .then(result => {
        if(result){
            
            if(result.is_active){
                res.status(400).send({
                    status: 400,
                    code: "400",
                    data: null,
                    message: "Company is already active"
                  })
            }else{
                result.is_active = true
                result.save().then(()=>{
                    res.status(200).send({
                        status: 200,
                        code: "200",
                        data: {
                          id: req.params.id,
                          is_active: true
                        },
                        message: "Success"
                      })
                }).catch(err =>{
                    res.status(500).send({
                        status: 500,
                        code: "500",
                        data: null,
                        message: err.message || "Error"
                    });
                })
            }
        }else{
            res.status(422).send({
                status: 422,
                code: "422",
                data: null,
                message: "Data is not found"
            })
        }
    });

}

module.exports = {
    getAlldata,
    createCompany,
    updateCompany
}