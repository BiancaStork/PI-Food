import {useEffect, useState} from 'react'
import { Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, postRecipes } from '../../redux/actions';
import s from './FormCreate.module.css';
import imagenDefault from '../../assets/recetaNueva.jpg';
import imagen from '../../assets/recetaNueva.jpg'

const FormCreate =() => {

  const dispatch = useDispatch();
  const history = useHistory(); // me redirige a la ruta que yo le digo
  const diets = useSelector((state)=> state.diets)
  
  const [input, setInput] = useState({
    title:"",
    summary:"",
    healthScore:"",
    instructions:"",
    image:"",
    diets:[],
  })

  const [errors, setErrors] = useState({
    title:"",
    summary:"",
    healthScore:"",
    instructions:"",
    image:"",
    diets:[],
  });

  useEffect(()=> {
    dispatch(getDiets());
  },[dispatch])  

  const handleChange =(e)=>{
    const prop = e.target.name;
    const value = e.target.value;
    setInput({ //con esto copia los valores q el usuario puso en el form en el estado global (Base de Datos)
      ...input,
      [prop]:value
    })

    validate({
      ...input,
      [prop]:value
    })

 }

  const handleSelected=(e)=>{
         setInput({
        ...input,
        diets: [
          ...input.diets, e.target.value]
      })
      
  }

  const handleDelete =(e)=>{
    setInput({
      ...input,
      diets: input.diets.filter(diet => diet !== e)
    })
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(input.image===""){input.image=imagen}  
    try{
      dispatch(postRecipes(input))
      alert("receta creada")
    } catch(error){
      console.log(error)
      alert(error.message)}
    
    //alert("Recipe created")
    setInput({
      title:"",
      summary:"",
      healthScore:"",
      instructions:"",
      image:"",
      diets:[],
    });
    history.push('/home')

  }
 
//validate va a chequear el estado del formulario con expresiones regulares-regex-(las puedo googlear)... 
//controla q esten bien ingresados los campos
  const validate =(input)=>{

    let regexString = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/; //REGEX SOLO LETRAS
    if (!input.title.trim()) {errors.title = "Title is required !"} 
    else errors.title = "";
    if (!regexString.test(input.title.trim())) { errors.title = "Title must be only letters !"} 
    else errors.title = "";
    if (input.title.length > 50 || input.title.length < 5) {errors.title =  "Title must be between 5 and 50 characters !"}  else errors.title = ""; 

    if (!input.healthScore) {
      errors.healthScore = "Health Score is required !";
    } else if (!Number.isInteger(Number(input.healthScore))) {
      errors.healthScore = "Health Score must be a number !";
    } else if (input.healthScore < 1 || input.healthScore > 100) {
      errors.healthScore = "Health Score must be between 1 and 100 !";
    } else errors.healthScore = ""

    if (!input.summary.trim()) {
      errors.summary = "Summary is required !";
    } else if (input.summary.length > 255 || input.summary.length < 5) {
      errors.summary = "Summary must be between 5 and 255 characters !";
    } else errors.summary = ""

    if (!input.instructions.trim()) {
      errors.instructions = "Instructions is required !";
    } else if (input.instructions.length < 5 || input.instructions.length > 255) {
      errors.instructions = "Instructions must be between 5 and 255 characters !";
    } else errors.instructions = ""
  
    if(!input.diets.length === 0) {
      errors.diets = "" 
    } else errors.diets = "Diets is required !";
  return errors

}  

  return (

    <div className={s.container}>
    <div className={s.principal}>
    <div className={s.container1}> <Link to={"/home"}><button className={s.button}>H O M E</button></Link></div>
    <div className={s.divImg}><img src={imagenDefault} /></div>  
    <div  className={s.form}>
    <form onSubmit={(e)=>handleSubmit(e)}>
      <div className={s.div1}>
      <label >TITLE: </label>
      <input type="text" value={input.title} onChange={handleChange} name="title" placeholder='more than 5 characters'/>
      <h5>{errors.title && <span>{errors.title}</span>}</h5>
      </div>

      <div className={s.div2}>
      <label>URL IMAGE: </label>
      <input  type="text" placeholder='url image not required'value={input.image} onChange={handleChange} name="image"/>   
      <h5></h5>   
      </div>  

      <div className={s.div3}>
      <label>HEALT SCORE: </label>
      <input type="text"  value={input.healthScore}  onChange={handleChange} name="healthScore" placeholder='value from 1 to 100'/>
      <h5>{errors.healthScore && <span>{errors.healthScore}</span>}</h5>         
      </div>

      <div className={s.div4}>
      <label>SUMMARY: </label>
      <textarea  type="textarea"  value={input.summary}  onChange={handleChange} name="summary" placeholder='short description of the recipe...'/>     
     
      </div>

      <div className={s.div5}>
      <label>STEPS: </label>
      <textarea type="textarea"  value={input.instructions}  onChange={handleChange} name="instructions" placeholder='recipe steps...'/>          
      <h5>{errors.instructions && <span>{errors.instructions}</span>}</h5>
      </div>

      <div className={s.div6}>
      <select onChange={e=>handleSelected(e)}>
      <option>Select Diet</option>        
        {diets.map((e)=> (
      <option  value={e.name}>{e.name}</option>
        ))}
      </select> 
      </div>
       
      <div className={s.div8}> 

    {input.diets.length && <button className={s.button} type="submit">CREAR RECETA</button>}
    {!input.diets.length && <button className={s.buttonOff} type="submit">CREAR RECETA</button>}  
      </div>
      </form> 
      <div className={s.div9}>     
       {input.diets.map(e=>
        <p className={s.divP}>{e}
        <button  onClick={()=>handleDelete(e)}>x</button></p>
        )} 
     {!input.diets.length && <span>{errors.diets}</span>}
        
      </div> 
    </div>
    </div>
    </div>
  
  )  
}

export default FormCreate