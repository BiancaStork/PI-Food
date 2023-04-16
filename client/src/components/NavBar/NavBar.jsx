
import {Link} from 'react-router-dom';
import s from "./NavBar.module.css";


const NavBar =({handleChange, handleSubmit, handleGetAll}) => {    
     
    return (
        <div className={s.container} > 

        <div className={s.box}>         
        <form>
            <input  
               type='text'  
                placeholder='Search Recipes'
                onChange={handleChange} />
            <button 
                onClick={handleSubmit}
                type='submit'>Search</button>             
                
        </form>   
      
        <button 
                onClick={handleGetAll}
                className={s.buttonAll} 
                type='submit'>All Recipes</button>     
        <div><Link to='/create'><button>Create Recipe</button></Link></div>  
        </div>  
        </div>
    )
  }

export default NavBar;