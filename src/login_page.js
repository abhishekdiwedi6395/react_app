import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./scss/login.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Please enter user");
    } else if (!password) {
      setError("Please enter password");
    } else {
      try {
        setError("");
        await userLogin();
        console.log("Login successful");
        // Redirect to the home page
        navigate("/home");
      } catch (error) {
        setError("Login failed. Please try again.");
        console.log(error);
      }
    }
  };

  const userLogin = async () => {
    const item = { user, password }; // Assuming 'user' and 'password' variables are defined
  
    try {
      const response = await fetch("http://64.226.101.239:8080/admin/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "track_spot_api_key",
        },
        body: JSON.stringify(item),
      });
  
      if (!response.ok) {
        throw new Error("Failed to log in");
      }
  
      const result = await response.json();
      localStorage.setItem("users", JSON.stringify(result));
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };
  userLogin();

  return (
    <>
      <div className="main_div">
        <div className="left">
          <div className="image">
            <img src="images/logo2.png" />
            <hr className="hr"></hr>
          <p className="para">Vivamus at dui consequat, dapibus tellus vitae</p>
          </div>
        </div>

        <div className="right">
          <div className="map_img">
            <img src="images/map.png" />
            <div className="center_div">
              <div className="content">
                <form onSubmit={handleSubmit}>
                  <h1>Log in</h1>
                  <input
                    type="text"
                    id="content_input"
                    name="user"
                    placeholder="Enter your user"
                    value={user}
                    onChange={handleUserChange}
                  />
                  {error && <p className="error">{error}</p>}
                  <input
                    type="password"
                    id="content_input"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {error && <p className="error">{error}</p>}
                  <button className="login_button" type="submit">
                    Login
                  </button>
                  <a href="#">Sign In?</a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
