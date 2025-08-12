import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../api/apiClient";
import AuthForm from "../components/AuthForm";
import { logFormInteraction } from "../components/ClickLogger";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await logFormInteraction("Login", "submitted", { username: form.username });

    try {
      const res = await apiClient.post("/users/login/", form);
      const { tokens, user } = res.data;

      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);
      localStorage.setItem("user", JSON.stringify(user));

      await logFormInteraction("Login", "succeeded", { username: user.username });

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      await logFormInteraction("Login", "failed", {
        username: form.username,
        error: error.message,
      });
      // Add error UI here if you want
    }
  };

  const fields = [
    { name: "username", type: "text", placeholder: "Username", onChange: handleChange },
    { name: "password", type: "password", placeholder: "Password", onChange: handleChange }
  ];

  return (
    <>
      <AuthForm title="Log In" fields={fields} onSubmit={handleSubmit} />
      <p style={{ color: "#ccc", marginTop: "1rem", fontFamily: "'Fira Mono', monospace", fontSize: "0.9rem", textAlign: "center" }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "#82aaff" }}>
          Register here
        </Link>
      </p>
    </>
  );
}
