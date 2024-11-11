import React from 'react'
import '../assets/styles/principal.css'
import Botoniniciosesion from './botoniniciosesion'
import { Link } from 'react-router-dom';

export const header = () => {
  return (
    <>
        <header id="header" className="header d-flex align-items-center sticky-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <Link to="/" className="logo d-flex align-items-center me-auto" id='tituloh1'>
          <h1 className="sitename">Samay Kiti</h1>
        </Link>
          {/*<nav id="navmenu" className="navmenu">
            <ul>
            <li><a href="#">Home</a></li>
              <li><a href="about.html">PAGINA</a></li>
              <li><a href="courses.html">PAGINA</a></li>
              <li><a href="trainers.html">PAGINA</a></li>
              <li><a href="contact.html">PAGINA</a></li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>*/}
          <Botoniniciosesion />
        </div>
      </header>
    </>
  )
}
export default header