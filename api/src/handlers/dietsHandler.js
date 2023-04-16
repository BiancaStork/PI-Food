const {searchAll} = require ('../controllers/dietsController.js')


const getDiets = async (req, res)=>{
   try{
    const diets = await searchAll();
    res.status(200).json(diets);
   }
  catch(error){
   res.status(400).json({error: error.message});
   }
}


module.exports = {
    getDiets,
}