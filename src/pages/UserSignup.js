import React, { useEffect, useState } from "react";
import "./signup.css";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../state/user/userSlice";
import { useNavigate } from "react-router-dom";

const UserSignup = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!phone.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    dispatch(userSignup({ phone: phone, originalPassword: password }));
    // No navigation here
    setPhone("");
    setPassword("");
    setError("");
  };

  useEffect(() => {
    if (data) {
      navigate("/cart");
    }
  }, [data, navigate]);

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Signup
        </button>
      </form>
    </div>
  );
};

export default UserSignup;
