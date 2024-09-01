import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom'
import { Footer } from "../component/footer";

const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const respuesta = async () => {
            const res = await actions.goPrivate();
            if (!res) {
                navigate("/");
            }
        };

        respuesta();
    }, [actions, navigate]);

    return (
        <div className="d-flex flex-column vh-100" style={{
			backgroundImage: "url(https://img.freepik.com/foto-gratis/vista-superior-red-comunicacion-internet_23-2148779266.jpg?t=st=1724776105~exp=1724779705~hmac=41a808f793862bf40b8626691f510d62a8c90c0bddad812526a714b2543928f4&w=1380)",
			backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"
    }}>
            <div className="text-center mb-3 mt-3">
                <h3 className="display-6 container card bg-light bg-opacity-50" style={{ borderRadius: "5px"}}>Este es el menú privado</h3>
                <img src="https://global.discourse-cdn.com/standard14/uploads/daml/original/2X/0/07c87a4e2885ff7d9674efb218e08a5d354612f6.jpeg" className="col-5 mt-3" />
            </div>

        </div>

    )
}

export default Private