import { Button, Paper, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import * as Realm from "realm-web";

interface LoginState {
  email: string;
  password: string;
}

const initialLoginState: LoginState = {
  email: "",
  password: "",
};

type LoginProps = {
  app: Realm.App;
  setUser: Dispatch<SetStateAction<Realm.User | undefined>>;
};

const Login = ({ app, setUser }: LoginProps) => {
  const [loginData, setLoginData] = useState(initialLoginState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Create an email/password credential
    const credentials = Realm.Credentials.emailPassword(loginData.email, loginData.password);
    const user: Realm.User = await app.logIn(credentials);
    setUser(user);
    // Here, you can add your login logic, such as making an API request or validating the user's credentials.
    console.log("Login data:", loginData);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Paper elevation={1} style={{ padding: "20px", borderRadius: "8px", width: "300px", textAlign: "center" }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <TextField type="email" name="email" label="Email" fullWidth variant="outlined" value={loginData.email} onChange={handleInputChange} required />
          <TextField
            type="password"
            name="password"
            label="Password"
            fullWidth
            variant="outlined"
            value={loginData.password}
            onChange={handleInputChange}
            required
            style={{ marginTop: "10px" }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "20px" }}>
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
