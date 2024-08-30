import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Footer } from "../component/footer";

const Private = () => {
    const navigate = useNavigate();

return (
    <div className="d-flex flex-column vh-100" style={{
        backgroundImage: 'url(https://img.freepik.com/foto-gratis/vista-superior-red-comunicacion-internet_23-2148779266.jpg?t=st=1724776105~exp=1724779705~hmac=41a808f793862bf40b8626691f510d62a8c90c0bddad812526a714b2543928f4&w=1380)',
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
    }}>
        <div className="container flex-grow-1 my-5 bg-light bg-opacity-75 py-3" style={{ borderRadius: "5px" }}>
            <p>Este es el menú privado</p>
        </div>
        <Footer />
    </div>

)
}

export default Private