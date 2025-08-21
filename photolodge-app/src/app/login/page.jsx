"use client";

import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        const res = await fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("username", data.username);
            router.push("/");
        } else {
            setError("Incorrect username or password!");
        }
    }

return (
    <form onSubmit={handleLogin} style={{ minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <img src="/images/photoLodgeLogo.png" alt="PhotoLodge Logo" width={175} height={175} />
      <div>
        <br />
        <h1>Welcome to PhotoLodge</h1>
      </div>
      <div>
        <br />
        <TextField label="Username" variant="outlined" value={username} onChange={e => setUsername(e.target.value)}/>
      </div>
      <div>
        <br />
        <TextField label="Password" variant="outlined" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div>
        <br />
        <Button type="submit" variant="contained" style={{ width: 210}}>Login</Button>
      </div>
      <div>
        <br />
        <Button
          variant="outlined"
          style={{ width: 210 }}
          onClick={() => router.push('/sign-up')}
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
}