const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},


		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			goPrivate: async () => {
				//recupera el token
				const token = localStorage.getItem("jwt-token");
				if (!token) {
					console.log("Token no encontrado");
					//si no exixte el token devuelve false
					return false;
				}
				try {
					const response = await fetch("https://upgraded-capybara-jj59g67g957hpvpx-3001.app.github.dev/private", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							//la API requiere esta sintaxis
							"Authorization": "Bearer " + token
						},
					});

					if (!response.ok) {
						throw Error("Hubo un problema en la solicitud");
					}
					const data = await response.json();
					console.log("Tienes acceso", data);
					//devuelve "true" si tiene acceso
					return true;
					//si en algún punto del código de try falla, salta catch
				} catch (err) {
					console.log(err);
				}
			}
		}
	};
};

export default getState;
/*
	deleteLogin(event) {
		event.preventDefault(); 
		fetch("https://upgraded-capybara-jj59g67g957hpvpx-3001.app.github.dev/login", {
			method: "DELETE",
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
				goPrivate();
				//lleva a la ruta privada si el token es correcto
				navigate("/private");
			})
			.catch((err) => { err })
	}
	
	getAsynv: async function fetchData(){
		//await fetch
		try{
			const response = await fetch(swapiURL, {})
			const data = await response.json
			console.log(data.result.properties.name);
		} catch (error) {
			console.log(error);
		}
	}*/
