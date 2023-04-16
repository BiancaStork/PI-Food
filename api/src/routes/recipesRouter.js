const {Router} = require('express');
const {
    getRecipesAll,
    getRecipe,
    createRecipe,
} = require ('../handlers/recipeHandler.js')

const recipesRouter = Router();

const validatePost = (req, res, next)=> {
    const {title, image, summary, healthScore, instructions, diets} = req.body;
  //validacion 
  if(!title) res.status(400).json({error:"Missing Title" });
  if(!image) res.status(400).json({error:"Missing Image" });
  if(!summary) res.status(400).json({error:"Missing Summary" });
  if(!healthScore) res.status(400).json({error:"Missing Heath Score" });
  if(!instructions) res.status(400).json({error:"Missing Instructions" });
  if(!diets.length) res.status(400).json({error:"Missing Diets" });
   next();
}

//---defino las rutas y sus handlers---(B)
recipesRouter.get('/', getRecipesAll);

recipesRouter.get('/:id', getRecipe);


recipesRouter.post('/', validatePost, createRecipe)


module.exports = recipesRouter;