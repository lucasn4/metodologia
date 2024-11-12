import "../assets/styles/loader.css"
export function loader(){
    return(
        <>
        
        <div className="loader loader--style2" title="1">
      <svg version="1.1" className="loaderr"id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           width="70px" height="70px" viewBox="0 0 50 50" style={{ enableBackground: 'new 0 0 50 50' }} xmlSpace="preserve">
        <path fill="#0d6efd" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
          <animateTransform attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.9s"
            repeatCount="indefinite"/>
        </path>
      </svg>
    </div>

        </>
    )
}


export default  loader;