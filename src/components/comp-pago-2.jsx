import "../assets/styles/com-pago-2.css"
import Loader from "./loader";
export function estado(){
    return(

<> <div className="info-pago">
              <p>
                Su pagoesta siendo procesado.

              </p>
              
            </div>
            <div className="centrar margenes"><p> En breve le estaremos comunicando el estado de su pedido.</p>
 <p> El proceso puede demorar aproximadamete entre  4 a 8hs. </p>
    
</div>
<div className="centrar margenes">
                <Loader />
            </div>
 


</>


    )
}

export default estado;