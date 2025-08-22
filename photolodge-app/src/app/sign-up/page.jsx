"use client";

import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  // ...existing code...
  const res = await fetch(`http://ec2-54-146-16-230.compute-1.amazonaws.com:8080/api/users/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      setSuccess("Account created! You can now log in.");
      setTimeout(() => router.push("/login"), 1500);
    } else {
      const data = await res.json();
      setError(data.error || "Sign up failed.");
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="/images/photoLodgeLogo.png"
        alt="PhotoLodge Logo"
        width={175}
        height={175}
      />
      <br />
      <h1>Sign Up for PhotoLodge</h1>
      <br />
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: 210 }}
      />
      <br />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: 210 }}
      />
      <br />
      <Button
        type="submit"
        variant="contained"
        style={{ width: 210 }}
      >
        Sign Up
      </Button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
    </form>
  );
}