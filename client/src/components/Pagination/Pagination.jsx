import React from "react";
import  '../Pagination/Pagination.modules.css';

const Pagination =({recipesPage, recipes, paginado})=>{
   
    const pageNumber=[];
    for (let i= 0; i< Math.ceil(recipes/recipesPage); i++) {
        pageNumber.push(i+1)
    }
 
  function handleClickNext() {
   
  }
  
  function handleClickPreview() {
   

  }
    
    
    
    return (        
     <nav className="pagination">  
      
        {pageNumber && pageNumber.map(number =>(    
         <div className="page-item" key={number}>
         <a onClick= {() => paginado(number)} className="page-link">
         <button className='page-btn'>{number }</button>
         </a>         
         </div>
        ))}  
               
    </nav>
    );
}

export default Pagination;