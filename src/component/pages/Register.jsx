import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "../contexts/authContext";
import "./auth.scss";

const Register = () => {
  const { register, loading } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
    },
    [form, register]
  );

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
            <span className="gradient">Create your account</span>
          </h1>
          <p className="auth-subtitle">Join and explore the projects.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span className="field-label">Full name</span>
            <div className="input-wrap">
              <FiUser className="field-icon" />
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="input"
              />
            </div>
          </label>

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
                minLength={6}
                autoComplete="new-password"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={handleChange}
                className="input"
              />
            </div>
          </label>

          <button className="btn btn--primary btn--full" disabled={loading}>
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>

        <div className="auth-foot">
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
