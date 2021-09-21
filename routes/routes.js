const express = require('express');
const axios = require("axios");
const router = express.Router();
const {getAlldata,createCompany,updateCompany} =require('../controllers/companyController');
const {createEmployee,getAlldataEmployee,updateDataEmployee,removeDataEmployee} =require('../controllers/employeeController');

// 1 dan 2 
router.post('/fibonaci',  async (req,res) => {

    if(!req.body.n ){
        res.status(400).send({
            status: 400,
            code: "400",
            data: null,
            message: "n is required"
        })
    }
    let fib = [0,1];

    for (let i = 1; i <= req.body.n; i++) {
        fib.push(fib[i] + fib[i-1])
    }
    res.status(200).send({
        status: 200,
        code: "200",
        data: {result: fib.join(" ")},
        message: "Success"
    })

})




router.post('/combination',  async (req,res) => {
    if(!req.body.n || !req.body.r){
        res.status(400).send({
            status: 400,
            code: "400",
            data: null,
            message: "n & r is required"
        })
    }
    const  factorial = (n) =>{
        if(n !== 0){
            if(n === 1) return n
            return n * factorial(n-1)
        }
    }

    let temp = factorial(req.body.n) / (factorial(req.body.r) * factorial((req.body.n-req.body.r)))

    res.status(200).send({
        status: 200,
        code: "200",
        data: {result: temp},
        message: "Success"
    })

})


// 3
router.get('/companies',getAlldata);
router.post('/companies',createCompany);
router.put('/companies/:id/set_active',updateCompany);

router.post('/companies/:company_id/employees',createEmployee);
router.get('/employees/:id',getAlldataEmployee);    
router.put('/companies/:company_id/employees/:employee_id',updateDataEmployee)
router.delete('/employees/:id',removeDataEmployee);

//4

router.get('/countries', async (req,res) =>{
    try {
        let Data = [];
        const {data} = await axios.get('https://restcountries.eu/rest/v2/all')
        data.forEach(element => {
            Data.push({
                name: element.name,
                region:element.region,
                timezones:element.timezones
            });
        });

        res.status(200).send({
            status: 200,
            code: "200",
            data: Data,
            message: "Success"
        })
      } catch(error) {
            res.status(400).send({
                message : "Something Went Wrong"
            });
      } 
});


module.exports = {
    routes: router
}