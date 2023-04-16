const {Router} = require('express');
const { getDiets} = require ('../handlers/dietsHandler.js');

const dietsRouter = Router();

dietsRouter.get('/', getDiets);




module.exports = dietsRouter;