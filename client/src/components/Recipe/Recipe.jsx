import React from 'react';
import { Link } from 'react-router-dom';
import s from './Recipe.module.css';




const Recipe =({recipe}) =>{

const {image, title, healthScore, diets, vegetarian, id, Diets } = recipe;

return(
     
    <div className={s.divRecipe}>
    <img src={image} className={s.img}/>
    <h2> {title}</h2>  
    <h2>H. Score: {healthScore}</h2>
    <h4> Diets: {vegetarian===true? 'vegetarian' + ' ' : null}
    {Diets? Diets.map(e=>e.name) + ' ' : diets + ' '}</h4>  
          
    <Link to={`/home/${id}`}><button className={s.button}>More...</button></Link>
    </div>
)
}

export default Recipe;
