const axios = require ('axios');
const {Diet} = require ('../db.js')
require('dotenv').config();
const {URL_1, API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5, API_KEY_6} = process.env; 


const searchAll= async ()=>{

    const dietsApi =  (await axios.get(`${URL_1}${API_KEY_4}`)).data; //me traigo todo de la API
    const dietsTotal = dietsApi.results.map(e => e.diets); // me trae los ARRAY's del atributo 'diets'
    const dietsBool = "vegetarian";
    const dietsArray = dietsTotal.flat(); // me trae en un solo array todos los 'diets' que encuentra en la API
    const diets = [...new Set(dietsArray.concat(dietsBool))]; // me convierte en un array con elementos unicos, sin duplicados 
    diets.forEach(e => {    //me crea en la base de datos cada 'diet' que encuentra
        if (e !== undefined){
             Diet.findOrCreate({
            where: {name: e}             
        })
     }        
    });
    const totalDiets = await Diet.findAll();
    return totalDiets
 
}



module.exports = {
   searchAll
}