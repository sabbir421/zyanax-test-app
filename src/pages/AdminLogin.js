import React, { useEffect, useState } from "react";
import "./signup.css";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../state/user/userSlice";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../state/admin/adminSlice";

const AdminLogin = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.admin);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userId.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    dispatch(adminLogin({ userId, originalpassword: password }));
    setUserId("");
    setPassword("");
    setError("");
  };

  useEffect(() => {
    if (data) {
      navigate("/admin/dashboard");
    }
  }, [data, navigate]);

  return (
    <div className="signup-container">
      <h2>Admin Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="mobileNumber">User Id:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
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
          Sign in
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
