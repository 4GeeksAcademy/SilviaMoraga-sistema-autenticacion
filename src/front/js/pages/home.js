import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../component/footer";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	function login(event) {
		event.preventDefault(); 
		fetch("https://upgraded-capybara-jj59g67g957hpvpx-3001.app.github.dev/login", {
			method: "POST",
			body: JSON.stringify({
				"email": document.getElementById("email").value,
				"password": document.getElementById("password").value
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => {
				//guarda el token en el localStorage 
				localStorage.setItem("jwt-token", data["jwt-token"]);
				console.log("Usuario logueado");
				//verifica el acceso del token
				actions.goPrivate();
				//lleva a la ruta privada si el token es correcto
				navigate("/private");
			})
			.catch((err) => { err })
	}

	return (
		<div className="d-flex flex-column vh-100" style={{
			backgroundImage: "url(https://img.freepik.com/foto-gratis/vista-superior-red-comunicacion-internet_23-2148779266.jpg?t=st=1724776105~exp=1724779705~hmac=41a808f793862bf40b8626691f510d62a8c90c0bddad812526a714b2543928f4&w=1380)",
			backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"
		}}>
			<div className="d-flex flex-grow-1 justify-content-center align-items-center">
				<div className="card col-3 bg-light bg-opacity-75 position-relative" style={{ borderRadius: "5px" }}>
					<div className="bg-light rounded-circle position-absolute top-0 start-50 translate-middle"
						style={{ width: "80px", height: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}>
						<i className="fa-solid fa-user-astronaut fa-2xl" />
					</div>
					<div className="card-body">
						<h4 className="text-center mt-5">Login</h4>
						<form onSubmit={login}>
							<div className="mb-3">
								<label className="form-label">Email address</label>
								<input type="email" className="form-control" id="email" placeholder="name@example.com" />
							</div>
							<div className="mb-3">
								<label className="form-label">Password</label>
								<input type="password" className="form-control" id="password" placeholder="Your password" />
							</div>
							<div className="d-flex flex-column">
								<Link to="/register" className="mb-3">
									Sign up here!
								</Link>
								<button type="submit" className="btn btn-primary">Login</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};
