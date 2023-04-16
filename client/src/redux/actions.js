import { GET_RECIPES, 
         GET_BY_NAME, 
         GET_BY_ID, 
         FILTER_BY_DIET, 
         FILTER_CREATED, 
         ORDER_BY_NAME, 
         ORDER_BY_SCORE,
         GET_DIETS } from './actionsTypes';

import axios from "axios";

export const getRecipes=()=>{
    return async function (dispatch) {
        const apiData = await axios.get("http://localhost:3001/recipes"); 
        const recipes = apiData.data;
       // console.log("esto me trae getRecipes: " + recipes)
        return dispatch({
            type: GET_RECIPES,
            payload: recipes
        })
    }
}
export const getByName=(name)=> {
  
    return async function (dispatch) {
         try {
         const apiData= await axios.get(`http://localhost:3001/recipes?name=${name}`);
         return dispatch({ 
            type: GET_BY_NAME, 
            payload:apiData.data})
                
        } catch {alert("This recipe doesn't exist")}
    }
}

export const getById = (id) => {
    return async function (dispatch) {
        try {
        const apiData= await axios.get(`http://localhost:3001/recipes/${id}`);
        //console.log("ESTO ME TRAE getById: " + apiData)
        return dispatch({ 
            type: GET_BY_ID, 
            payload: apiData.data})
        } catch{alert("This recipe doesn't exist")}
    }
}

export const filterByDiet=(payload) =>{
    return{
        type: FILTER_BY_DIET,
        payload
    }
}

export const filterCreated=(payload)=>{
    return {
        type: FILTER_CREATED,
        payload
    }
}

export const orderByName =(payload)=> {
    return {
        type: ORDER_BY_NAME,
        payload
    }

}
export const orderByScore =(payload)=> {
    return {
        type: ORDER_BY_SCORE,
        payload
    }

}
export const getDiets=()=>{
    return async function (dispatch) {
        const apiData = await axios.get("http://localhost:3001/diets"); 
        const diets = apiData.data;
       
        dispatch({
            type: GET_DIETS,
            payload: diets
        })
    }
}

export const postRecipes =(payload) =>{
    try{
        return async function (dispatch){
            const data = await axios.post("http://localhost:3001/recipes", payload);
          //  console.log("response: " + data);
            return data; 
    }
   
    }catch(error){ return error}
}
