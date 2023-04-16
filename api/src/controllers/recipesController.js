//---(B)---//
const {Recipe, Diet}=require('../db.js');
const axios = require ('axios');
require('dotenv').config();
const {URL_1, API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5, API_KEY_6  } = process.env; 
 

//1. controlador para la busqueda por ID en API o en BD
const  getRecipeById = async (id, source)=>{ 
    const result = 
       source === 'api' 
       ? (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY_4}`)).data
       : await Recipe.findByPk(id, {       
        //esto para poder hacer la relacion y al crear una receta me relacione con la dieta
        include:{  
            model: Diet,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        }
     }); 
       //console.log(result instanceof Recipe)      
     return result;
   
 }
 

 //3. controlador para buscar todas las recetas (en API Y Base de Datos)
 const searchAll= async () =>{
    //busqueda en la Base de Datos
    const resultBd = await Recipe.findAll({       
        //esto para poder hacer la relacion y al crear una receta me relacione con la dieta
        include:{  
            model: Diet,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        }
     });
    
     //console.log("ESTA SON LAS DIETAS DE LAS RECETAS EN BD: "+ dietsBd) 
    //busqueda en API
     const result=(  await axios.get(`${URL_1}${API_KEY_4}`)).data;      
     const resultApi = cleanArray(result.results); //"results" es el array de recetas de la API
     //console.log("esto hay en la base de datos:  " + resultBd) 
       return [...resultBd,
             ...resultApi];
   
    //console.log(resultTotal)
    
 }

 //3. controlador para buscar por query
 const searchByQuery= async (name) =>{   
    const result = await searchAll();
    const filteredByName = result.filter( e => e.title.toLowerCase().includes(name.toLowerCase()));
   // console.log(filteredByName)
    return filteredByName;    
 }
 
// 4. controlador para crear nuevas recetas del usuario
const createNewRecipe = async (title, image, summary, healthScore, instructions, diet) => {
 try{
    const recipeCreate = await 
       Recipe.create({title, image, summary, healthScore, instructions});
       const dietDb = await Diet.findAll({
        where: {name: diet},
    });
    recipeCreate.addDiet(dietDb);
  
    return recipeCreate
} catch(error){console.log(error)}
}
//5 funcion cleanArray para limpiar los datos de la API que no me interesa traer
const cleanArray=(array)=>
    array.map((el) =>{
        return {
            id: el.id,
            title: el.title,
            summary: el.summary,
            healthScore: el.healthScore,
            instructions:el.instructions,
            image: el.image,
            diets: el.diets.map(el => el), 
            vegetarian: el.vegetarian,
            createInBd: false
        };
        
    });    


module.exports={
    createNewRecipe,
    getRecipeById,
    searchByQuery,
    searchAll,
    cleanArray,
    
};