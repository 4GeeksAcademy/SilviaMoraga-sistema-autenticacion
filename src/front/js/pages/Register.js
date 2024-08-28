import React from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();

    function signUp() {
      console.log({ "email": document.getElementById("email").value });
      console.log({ "password": document.getElementById("password").value });
    
      fetch("https://upgraded-capybara-jj59g67g957hpvpx-3001.app.github.dev/register", {
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
            console.log("Usuario registrado y token guardado");
            navigate('/');
          })
          .catch((err) => { err })
      }

    return (
        <div className="container mt-5">
            <h3 className='text-center mb-3'>Sign up</h3>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter email" />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter password" />
            </div>
            <button type="submit" className="container btn btn-primary"
                onClick={() => {
                    signUp();
                }}>Save</button>
            <a href="/">Take me back</a>
        </div>
    )
}

export default Register