import React from 'react'
import '../assets/styles/principal.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../node_modules/glightbox/dist/css/glightbox.min.css';
import '../../node_modules/swiper/swiper-bundle.min.css';
import '../../node_modules/aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import Map from './mapa.jsx';
import { Imagen1, Imagen2, Imagen3, Imagen4, Imagen5, Imagen6, Imagen7, Imagen8, Imagen9, Imagen10, Imagen11, Imagen12, Imagen13, Imagen14 } from '../assets/imagenes/img-js/imgs.js'

export const principal = () => {
  useEffect(() => {
    AOS.init(); // Inicializa AOS
  }, []);
  return (
  <>
    <header id="header" className="header d-flex align-items-center sticky-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <a href="index.html" className="logo d-flex align-items-center me-auto" id='tituloh1'>
            <h1 className="sitename">Samay Kiti</h1>
          </a>
          <nav id="navmenu" className="navmenu">
            <ul>
            <li><a href="#">Home</a></li>
              <li><a href="about.html">PAGINA</a></li>
              <li><a href="courses.html">PAGINA</a></li>
              <li><a href="trainers.html">PAGINA</a></li>
              <li><a href="contact.html">PAGINA</a></li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>
          <a className="btn-getstarted" href="courses.html">Iniciar Sesion</a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero section dark-background">
        <img id="imagencentral" src={Imagen14} alt="" />
        <div className="container">
          <div className="contenedorlogotitulo">
            <div className="contenedorimagen">
              <img src={Imagen2} className="imagenlogo" alt="" data-aos="fade-up" data-aos-delay="100"/>
            </div>
            <h2 data-aos="fade-up" data-aos-delay="200" id="textotitulo">Bienvenido a <br />Hostal Samay Kiti</h2>
          </div>
          <p data-aos="fade-up" data-aos-delay="300">Tu refugio en el corazón de Amaicha del Valle</p>
          <div className="d-flex mt-4" data-aos="fade-up" data-aos-delay="400">
            <a href="courses.html" className="btn-get-started">Reservar</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6 order-1 order-lg-2" id="contenedorporque" >
              <img src={Imagen10} className="img-fluid" alt="" data-aos="fade-up" data-aos-delay="200"/>
              <img src={Imagen9} className="img-fluid" alt="" data-aos="fade-up" data-aos-delay="300"/>
              <img src={Imagen11} className="img-fluid" alt="" data-aos="fade-up" data-aos-delay="400"/>
            </div>
            <div className="col-lg-6 order-2 order-lg-1 content" id="contenedorporquetexto" data-aos="fade-up" data-aos-delay="200">
              <h3>¿El diseño de Samay Kiti refleja la cultura de Amaicha del Valle?</h3>
              <p className="fst-italic">
                ¡Absolutamente! Cada espacio en Samay Kiti ha sido pensado para que vivas la autenticidad de nuestra región.
              </p>
              <ul>
                <li><i className="bi bi-check-circle"></i> <span>Decoración autóctona: elementos tradicionales que evocan la cultura local.</span></li>
                <li><i className="bi bi-check-circle"></i> <span>Artesanía local: piezas únicas de la zona adornan cada rincón.</span></li>
                <li><i className="bi bi-check-circle"></i> <span>Ambiente cálido: diseñado para que te sientas parte de Amaicha del Valle.</span></li>
              </ul>
              {/*<a href="#" className="read-more"><span>Descubre Más Sobre Nosotros</span><i className="bi bi-arrow-right"></i></a>*/}
            </div>
          </div>
        </div>
      </section>
      <section id="why-us" className="section why-us">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div className="why-box">
              <h3>¿Por qué elegir Samay Kiti?</h3>
              <p>
                Ubicado en el encantador Amaicha del Valle, Samay Kiti te ofrece un rincón de nuestro hostal que refleja la rica herencia de la región, creando un ambiente acogedor y auténtico.
                <br /><br />
                En Samay Kiti, te sentirás como en casa, rodeado de la calidez de nuestra gente y la belleza de nuestro entorno.
                <br /><br />
                ¡Ven y descubre todo lo que tenemos para ofrecerte!
              </p>
              <div className="text-center">
                {/*<a href="#" className="more-btn">
                  <span>Learn More</span> <i className="bi bi-chevron-right"></i>
                </a>*/}
              </div>
            </div>
          </div>

          <div className="col-lg-8 d-flex align-items-stretch" id="contenedordatos">
            <div className="contenedorimagenporque">
              <img src={Imagen12} className="fondoporque" alt="Paisaje Samay Kiti"  data-aos="fade-up" data-aos-delay="200"/>
            </div>
            <div className="row gy-4" data-aos="fade-up" data-aos-delay="300">
              <div className="col-xl-4">
                <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-door-closed"></i>
                  <h4>Habitaciones exclusivas</h4>
                  <p>Garantizamos una experiencia íntima, donde cada detalle y decoración honra la esencia de la región.</p>
                </div>
              </div>

              <div className="col-xl-4" data-aos="fade-up" data-aos-delay="400">
                <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-cup-straw"></i>
                  <h4>Desayunos a gusto</h4>
                  <p>Empieza cada mañana con un desayuno hecho a tu medida, personalizado al gusto de cada huésped.</p>
                </div>
              </div>

              <div className="col-xl-4" data-aos="fade-up" data-aos-delay="500">
                <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-car-front-fill"></i>
                  <h4>Estacionamiento privado</h4>
                  <p>Disfruta de la comodidad de un estacionamiento privado, haciendo tu experiencia aún más placentera.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      {/* Courses Section */}
      <section id="courses" className="courses section">
        <div className="container section-title" data-aos="fade-up">
          <p>Ubicación</p>
          <Map />
        </div>
        <div className="container">
          <div className="row">
            {/* Course Item */}
            
            {/* Add more course items as needed */}
          </div>
        </div>
      </section>

      {/* Trainers Index Section */}
      <section id="trainers-index" className="section trainers-index">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="100">
              <div className="member">
                <img src="assets/img/trainers/trainer-1.jpg" className="img-fluid" alt="Walter White" />
                <div className="member-content">
                  <h4>Walter White</h4>
                  <span>Web Development</span>
                  <p>
                    Magni qui quod omnis unde et eos fuga et exercitationem. Odio veritatis perspiciatis quaerat qui aut aut aut
                  </p>
                  <div className="social">
                    <a href="#"><i className="bi bi-twitter-x"></i></a>
                    <a href="#"><i className="bi bi-facebook"></i></a>
                    <a href="#"><i className="bi bi-instagram"></i></a>
                    <a href="#"><i className="bi bi-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>
            {/* End Team Member */}

            <div className="col-lg-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="200">
              <div className="member">
                <img src="assets/img/trainers/trainer-2.jpg" className="img-fluid" alt="Sarah Jhinson" />
                <div className="member-content">
                  <h4>Sarah Jhinson</h4>
                  <span>Marketing</span>
                  <p>
                    Repellat fugiat adipisci nemo illum nesciunt voluptas repellendus. In architecto rerum rerum temporibus
                  </p>
                  <div className="social">
                    <a href="#"><i className="bi bi-twitter-x"></i></a>
                    <a href="#"><i className="bi bi-facebook"></i></a>
                    <a href="#"><i className="bi bi-instagram"></i></a>
                    <a href="#"><i className="bi bi-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>
            {/* End Team Member */}

            <div className="col-lg-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="300">
              <div className="member">
                <img src="assets/img/trainers/trainer-3.jpg" className="img-fluid" alt="William Anderson" />
                <div className="member-content">
                  <h4>William Anderson</h4>
                  <span>Content</span>
                  <p>
                    Voluptas necessitatibus occaecati quia. Earum totam consequuntur qui porro et laborum toro des clara
                  </p>
                  <div className="social">
                    <a href="#"><i className="bi bi-twitter-x"></i></a>
                    <a href="#"><i className="bi bi-facebook"></i></a>
                    <a href="#"><i className="bi bi-instagram"></i></a>
                    <a href="#"><i className="bi bi-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>
            {/* End Team Member */}
          </div>
        </div>
      </section>
      {/* /Trainers Index Section */}

      <footer id="footer" className="footer position-relative light-background">
        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <a href="index.html" className="logo d-flex align-items-center">
                <span className="sitename">SAMAY KITI</span>
              </a>
              <div className="footer-contact pt-3">
                <p>Hipolito Yrigoyen s/n</p>
                <p>Amaicha del Valle, Tucuman</p>
                <p className="mt-3"><strong>Telefonos:</strong> <span>+54 9 381 648-9834 // 381 647-0160</span></p>
                <p><strong>Email:</strong> <span>-</span></p>
              </div>
              <div className="social-links d-flex mt-4">
                <a href="#"><i className="bi bi-twitter-x"></i></a>
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Otras Paginas</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">PAGINA</a></li>
                <li><a href="#">PAGINA</a></li>
                <li><a href="#">PAGINA</a></li>
                <li><a href="#">PAGINA</a></li>
              </ul>
            </div>


            <div className="col-lg-4 col-md-12 footer-newsletter">
              <h4>Our Newsletter</h4>
              <p>Subscribe to our newsletter and receive the latest news about our products and services!</p>
              <form action="forms/newsletter.php" method="post" className="php-email-form">
                <div className="newsletter-form">
                  <input type="email" name="email" placeholder="Your Email" required />
                  <input type="submit" value="Subscribe" />
                </div>
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your subscription request has been sent. Thank you!</div>
              </form>
            </div>
          </div>
        </div>

        <div className="container copyright text-center mt-4">
          <p>© <span>Copyright</span> <strong className="px-1 sitename">Samay kiti</strong> <span>Todos los Derechos Reservados.</span></p>
          <div className="credits">
            Diseñado por <strong className="px-1 sitename">Grupo 7 - Comisión 7.</strong>
          </div>
        </div>
      </footer>

      {/* Scroll Top */}
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

      {/* Vendor JS Files */}
      <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="assets/vendor/php-email-form/validate.js"></script>
      <script src="assets/vendor/aos/aos.js"></script>
      <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
      <script src="assets/vendor/purecounter/purecounter_vanilla.js"></script>
      <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>

      {/* Main JS File */}
      <script src="assets/js/main.js"></script>

  </>
  )
}
export default principal