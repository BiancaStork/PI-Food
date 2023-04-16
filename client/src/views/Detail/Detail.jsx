import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from '../Detail/Detail.module.css';
import { getById } from "../../redux/actions";



const  Detail =() => {
  // console.log(props)
 const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail)
  const { title, summary, healthScore, instructions, image, diets, Diets, vegetarian } = detail;
  
  if(Diets) {
    var dietBd = Diets.map(e=>e.name);
  console.log(dietBd)}
 

  const {id}=useParams()

  useEffect(() => {
    dispatch(getById(id));
  },[dispatch]);

  return (
    <div className={s.container}>
    <div className={s.divRecipe}>
        <div className={s.title}><h1>{title}</h1></div>
        <img src={image} className={s.img}/> 
        <div> 
        <h3> Summary:</h3>
        {summary && (<h4 dangerouslySetInnerHTML={{__html: `${summary}` }} />)}
        </div>
        <h4 className={s.hc}>Health Score: {healthScore}</h4>
        <h3>Steps:</h3>
        {instructions && (<h4 dangerouslySetInnerHTML={{__html: `${instructions}` }} />)}
        <h3>Diets:</h3>
        <h4> {vegetarian===true? 'vegetarian' + ' ' : null}
        {Diets? Diets.map(e=>e.name) + ' ' : diets + ' '}</h4>       
        <Link to={"/home"}><button className={s.button}>H O M E</button></Link>
        </div>         
      </div>

    )
  
}

export default Detail;