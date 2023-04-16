
import react from 'react';
import RecipesContainer from "../../components/RecipesContainer/RecipesContainer"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByDiet, filterCreated, getByName, getDiets, getRecipes, orderByName, orderByScore } from "../../redux/actions";
import s from './Home.module.css';
import NavBar from '../../components/NavBar/NavBar';


const Home =() => {
 //al montar el componente 'Home', debe hacer el dispatch
 //para monotar el componente--->useEffect() --(con este hook de react manejamos el ciclo de vida del componente)
 //para hacer el dispatch ---> useDispatch() (es de redux)
 const dispatch = useDispatch();
 const allRecipes = useSelector((state => state.recipes));  //con useSelector me suscribo a un estado en este caso a recipes
 const diets = useSelector((state)=> state.diets); //me suscribo a diets para traer en el select las dietas de la bd
 const [name, setName] = useState('');
 const[orden, setOrden] = useState('');
 
 


  useEffect(()=>{
   
    dispatch(getRecipes());
    dispatch(getDiets());    
 
  },[dispatch]) //**importante! no olvidarse del array de dependencias en el useEffect para que no se genere un bucle infinito*/

  function handleChange (e){
    e.preventDefault() 
    setName(e.target.value)
   }
  
   function handleSubmit (e){
    e.preventDefault();
    if (name === '') {
      alert('the search is empty');
    }
    dispatch(getByName(name)); 
    
   }

   function handleGetAll(){
   // dispatch(getRecipes())
   window.location.reload(false); //hace un refresh de la url - carga de nuevo la pagina para resetear los filtros y ordenamientos
   }
   
  
  function handleFilterDiets(e){
    dispatch(filterByDiet(e.target.value))
  
  }
  
  function handleFilterCreated(e){
    dispatch (filterCreated(e.target.value))
  }

  function handleSort(e){   
    dispatch(orderByName(e.target.value));
    setOrden(`Ordenado ${e.target.value}`)
  }
  function handleScore(e){   
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setOrden(`Ordenado ${e.target.value}`)
  }

    return (
    <div className={s.principal}>      
      <NavBar handleChange={handleChange} handleSubmit={handleSubmit} handleGetAll={handleGetAll} className={s.navBar} />
    <div  className={s.homeContainer}>    
    
    <div className={s.filtrosContainer} >        
    <div className={s.select2}>      
       <select onChange={e=>handleFilterDiets(e)}>
        <option>Select Diet</option>
        <option value="all">All Diets</option>
        
         {diets.map((e)=> (
        <option  value={e.name}>{e.name}</option>
          ))}
        </select> 
        </div>    

        <button className={s.buttonAll} onClick={handleGetAll}>Reset Filter</button>
      
        <div>               
        <select onChange={e=> handleFilterCreated(e)}>
        <option>Select Origin</option>
        <option value="all">All Recipes</option>
        <option value="api">Origin: API</option>
        <option value="bd">Origin: BD</option>
        </select>
        </div>  
                
      
       <div  className={s.select1}>       
       <select  onChange={e=>handleSort(e)}>  
       <option>Select Order</option>        
       <option value="asc">A-Z</option>
       <option value="desc">Z-A</option>
       </select>
       </div>
       
       <div>          
       <select onChange={e=>handleScore(e)}>
       <option>Select Score</option>
       <option value="asc">High</option>
       <option value="desc">Low</option>
       </select>
       </div> 
      
      
      </div>     
      </div>
      <RecipesContainer  allRecipes={allRecipes}/>  
    </div> /*FIN .homeContainer */
    )
}

export default Home