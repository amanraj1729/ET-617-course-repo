import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../api/apiClient";
import AuthForm from "../components/AuthForm";
import { logFormInteraction } from "../components/ClickLogger";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone_number: "",
    age_group: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await logFormInteraction("Register", "submitted", { username: form.username, email: form.email });
    
    try {
      const res = await apiClient.post("/users/register/", form);
      const { tokens, user } = res.data;
      
      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);
      localStorage.setItem("user", JSON.stringify(user));
      
      await logFormInteraction("Register", "succeeded", { username: user.username, email: user.email });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      await logFormInteraction("Register", "failed", {
        username: form.username,
        email: form.email,
        error: error.message
      });
      // Add error UI here if you want
    }
  };

  const ageGroupOptions = [
    { value: "", label: "Select Age Group" },
    { value: "under_18", label: "Under 18" },
    { value: "18_25", label: "18-25" },
    { value: "26_35", label: "26-35" },
    { value: "36_50", label: "36-50" },
    { value: "50_plus", label: "50+" }
  ];

  const fields = [
    { name: "username", type: "text", placeholder: "Username", onChange: handleChange },
    { name: "email", type: "email", placeholder: "Email", onChange: handleChange },
    { name: "phone_number", type: "tel", placeholder: "Phone Number", onChange: handleChange },
    { name: "age_group", type: "select", placeholder: "Select Age Group", onChange: handleChange, options: ageGroupOptions },
    { name: "password", type: "password", placeholder: "Password", onChange: handleChange }
  ];

  return (
    <>
      <AuthForm title="Sign Up" fields={fields} onSubmit={handleSubmit} />
      <p style={{ color: "#ccc", marginTop: "1rem", fontFamily: "'Fira Mono', monospace", fontSize: "0.9rem", textAlign: "center" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#82aaff" }}>
          Log in here
        </Link>
      </p>
    </>
  );
}
