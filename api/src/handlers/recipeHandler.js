//---(B)---//
const axios = require('axios');

const {createNewRecipe, getRecipeById, searchByQuery, searchAll, cleanArray, }=require('../controllers/recipesController.js');




//******HANDLER PARA BUSCAR  TODOS  o tb  POR QUERY  ?name=' '*/---(B)---
const getRecipesAll = async (req, res) =>{
    const { name } = req.query;
   try{
    const results = name ?  
    await searchByQuery(name) :   await searchAll();
    results.length ? res.status(200).json(results)
                   : res.status(404).json("Sorry Recipe Not Found!")
   } catch (error){
         res.status(400).json({error: error.message});
    }
       
   };

//******HANDLER PARA BUSCAR POR ID ---(B)---

const getRecipe = async (req, res) =>{   
    const {id} = req.params;
     //EL id PUEDE SER N° (SI VIENE DE LA API) o UUID---> Q ES TIPO DE DATO: NaN (SI VIENE DE LA BD)---> TENGO QUE DIFERENCIAR
    const source = 
        isNaN(id) ? 'bd' 
                  : 'api';
    try{               
       const recipe = await getRecipeById(id, source);
        res.status(200).json(recipe);
     
    }catch(error){
        res.status(400).json({error: error.message})
    }
};

//******HANDLER PARA CREAR UNA NUEVA RECETA ---(B)---
const createRecipe = async (req, res) =>{
   const {title, image, summary, healthScore, instructions, diets} = req.body;
 try{
    const newRecipe = await createNewRecipe(title, image, summary, healthScore, instructions, diets);
    res.status(201).json(newRecipe);   
 } catch(error) { 
    res.status(400).json({error: error.message});
  }
}

 module.exports = {
    getRecipesAll,
    getRecipe,
    createRecipe,
    
 }