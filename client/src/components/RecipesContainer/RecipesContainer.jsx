import Recipe from '../Recipe/Recipe.jsx';
import s from './RecipesContainer.module.css';
import {useSelector} from 'react-redux';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination.jsx';

const RecipesContainer =({allRecipes}) => {

    //const recipes = useSelector(state => state.recipes); //store de redux
    const recipes =allRecipes;
  
    //paginacion--
    const [currentPage, setCurrentPage] = useState(1); //1
    const [recipesPage, setRecipesPage] = useState(9); //2
    const posLastRecipe = currentPage * recipesPage; //3
    const posFirstPage = posLastRecipe - recipesPage;//4
    const currentRecipe = recipes.slice(posFirstPage, posLastRecipe);//5
    //esta funcion es la que me va ayudar a renderizar el control del paginado
    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }
    const pageNumber=[];
    
    for (let i= 0; i<= Math.ceil(recipes/recipesPage); i++) {
        pageNumber.push(i+1)
    } 
    
    return (
    <div>
    <div className={s.pagination}>
    <Pagination 
        recipesPage = {recipesPage}
        recipes = { recipes.length}        
        paginado = {paginado}
    />
    </div>
    <div className={s.recipeList}>
    { currentRecipe.map(recipe =>       
      <Recipe recipe ={recipe}/> )}
    
    </div>
    </div>  
    )  
}

export default  RecipesContainer;