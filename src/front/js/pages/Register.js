import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Footer } from "../component/footer";

const Register = () => {
  const navigate = useNavigate();

  function signUp() {
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
        console.log("Usuario registrado", data);
        navigate('/');
      })
      .catch((err) => { err })
  }

  return (
    <div className="d-flex flex-column vh-100" style={{
			backgroundImage: "url(https://img.freepik.com/foto-gratis/vista-superior-red-comunicacion-internet_23-2148779266.jpg?t=st=1724776105~exp=1724779705~hmac=41a808f793862bf40b8626691f510d62a8c90c0bddad812526a714b2543928f4&w=1380)",
			backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"
    }}>
      <div className="container my-5 bg-light bg-opacity-75 py-3" style={{ borderRadius: "5px" }}>
        <h3 className="text-center mb-3 mt-3">Sign up</h3>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter password" />
        </div>
        <button type="submit" className="container btn btn-primary mb-3"
          onClick={() => {
            signUp();
          }}>Save</button>
        <a href="/">Take me back</a>
      </div>

    </div>
  )
}

export default Register