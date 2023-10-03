import React, { useEffect, useState } from "react";
import "./loginpage.css";
import { useNavigate,Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { API_PATH } from "../Api/Api";

function Loginpage() {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      if (decoded && decoded.exp) {
        const currentTime = Date.now() / 1000;

        localStorage.setItem("userId", decoded.userId);
        localStorage.setItem("firstName", decoded.firstName);
        localStorage.setItem("lastName", decoded.lastName);
        localStorage.setItem("email", decoded.email);
        localStorage.setItem("mobileNumber", decoded.mobileNumber);

        return decoded.exp < currentTime;
      }
      return true;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!isTokenExpired(token)) {
      navigate('/login');
    } else {
      localStorage.removeItem('token'); // Clear the expired token
    }
  }, [navigate]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateInput = () => {
    const errors = {};

    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(API_PATH + '/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        setError('Incorrect username or password');
        setShowSuccessMessage(false);
        return;
      }

      const data = await response.json();

      if (!data.token) {
        setError("Incorrect username or password");
        setShowSuccessMessage(false);
      } else {
        localStorage.setItem("token", data.token);
        setShowSuccessMessage(true);
        if (isTokenExpired(data.token)) {
          localStorage.removeItem("token");
          navigate('/login');
        } else {
          navigate('/', { state: { accessToken: data.token } });
        }
      }
    } catch (error) {
      setError('Something went wrong')
      setShowSuccessMessage(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="content">
        <div className="login">
          <h2 className="head">Log In</h2>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="gen">
                <div className="input-wrapper">
                  <input
                    className="login-input"
                    type="text"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email || ''}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  />
                </div>
                {formErrors.email && (
                  <p className="error-message">{formErrors.email}</p>
                )}
                <div className="input-wrapper">
                  <input
                    className="login-input2"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password || ''}
                    onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                  />
                </div>
              </div>
              {error && <p className="error-message">{error}</p>}
              {showSuccessMessage && <p className="success-message">Successfully logged in!</p>}
              <div className="button-div">
                {isLoading ? (
                  <button className="button-submit" type="submit" disabled>Loading...</button>
                ) : (
                  <button className="button-submit" type="submit">Log In</button>
                )}
              </div>
            </form>
            <div className="register-link">
              <center><p>Don't have an account? <Link to="/register">Register</Link></p></center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
