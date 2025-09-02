import React, { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "../contexts/authContext";
import "./auth.scss";

const Login = () => {
  const { login, loading } = useAuth();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await login(
        { email: form.email.trim(), password: form.password },
        { redirect: true }
      );
    },
    [form, login]
  );

  const from = location.state?.from;

  return (
    <div className="auth-view">
      <div className="auth-bg" />
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="auth-head">
          <h1 className="auth-title">
            <span className="gradient">Welcome back</span>
          </h1>
          <p className="auth-subtitle">
            Sign in to continue{from ? ` to ${from}` : ""}.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span className="field-label">Email</span>
            <div className="input-wrap">
              <FiMail className="field-icon" />
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="input"
              />
            </div>
          </label>

          <label className="form-field">
            <span className="field-label">Password</span>
            <div className="input-wrap">
              <FiLock className="field-icon" />
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="input"
              />
            </div>
          </label>

          <button className="btn btn--primary btn--full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="auth-foot">
          <p>
            New here? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
