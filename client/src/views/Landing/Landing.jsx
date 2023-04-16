import { Link } from "react-router-dom"
import fondoLanding from '../../assets/Landing.jpg';
import s from './Landing.module.css';

const Landing =() => {

    return (
      <div className={s.container}>
       <img src={fondoLanding} className={s.landingContainer} />
      
      <Link to='/home'><button className={s.button}> I N G R E S A R </button></Link>
    
       </div>
    )
  
}

export default Landing