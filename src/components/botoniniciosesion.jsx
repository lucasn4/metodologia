import React from 'react'
import '../assets/styles/principal.css'
import { Link } from 'react-router-dom';
export const botoniniciosesion = () => {
  return (
    <>
        {/*<a className="btn-getstarted" href="courses.html">Iniciar Sesion</a>*/}
          <div>
              <Link to="/registro" className='a'>
                <p className='btn-getstarted'>Reservar</p>
              </Link>
              </div>
    </>
  )
}
export default botoniniciosesion