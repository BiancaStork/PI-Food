import { 
  GET_RECIPES, 
  GET_BY_NAME, 
  GET_BY_ID, 
  FILTER_BY_DIET, 
  FILTER_CREATED,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
  GET_DIETS,
  POST_RECIPES
  } from "./actionsTypes";

const initialState = {
  recipes: [], 
  allRecipes: [], //para tener una copia con todos siempre--me sirve en los filtros
  detail: [],
  diets:[],
 
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {

      case GET_RECIPES: 
        return {
         ...state,
         recipes: action.payload,
         allRecipes: action.payload
      }

      case GET_BY_NAME: 
        return {
          ...state,
          recipes: action.payload
      }

      case GET_BY_ID: 
       return {
        ...state,
        detail: action.payload
      }

      case FILTER_BY_DIET:
        const allArray = state.allRecipes;     
        const filterBool = allArray.filter((e)=>e.vegetarian===true); //para filtrar las de propiedad 'vegetarian'
        
        const filterDiets = action.payload ==='all' ? allArray : action.payload ==='vegetarian' ? filterBool 
        : allArray.filter((e)=> e?.diets?.includes(`${action.payload}`));
        return{
          ...state,
          recipes: filterDiets
        }      

      case FILTER_CREATED: 
        const allRec = state.allRecipes;       
        const filterCreated = action.payload ==='bd' ? allRec.filter(e => e.createInBd) : allRec.filter(e => !e.createInBd)
        return {
         ...state,
         recipes: action.payload === 'all' ? allRec : filterCreated
      }

      case ORDER_BY_NAME:
        const sortedName = action.payload ==='asc' ?
          state.recipes.sort(function(a,b){
            if (a.title > b.title){
              return 1;
            } 
            if(b.title > a.title) {
              return -1 ;
            }
            return 0
          }) :
          state.recipes.sort(function(a,b){
            if (a.title > b.title){
              return -1;
            } 
            if(b.title > a.title) {
              return 1;
            }

          });
          return {
            ...state,
            recipes: sortedName
          }

          case ORDER_BY_SCORE:
        const sortedScore = action.payload ==='desc' ?
          state.recipes.sort(function(a,b){
            if (a.healthScore > b.healthScore){
              return 1;
            } 
            if(b.healthScore > a.healthScore) {
              return -1 ;
            }
            return 0
          }) :
          state.recipes.sort(function(a,b){
            if (a.healthScore > b.healthScore){
              return -1;
            } 
            if(b.healthScore > a.healthScore) {
              return 1;
            }

          });
          return {
            ...state,
            recipes: sortedScore
          }
          case GET_DIETS: 
          return {
            ...state,
            diets: action.payload,

          }
          case POST_RECIPES: return {
            ...state,
          }
         

      default:
            return {...state};
    }
  }
      
export default rootReducer;