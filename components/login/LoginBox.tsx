import Router from "next/router";
import React, { useState } from "react";
import axiosInstance from "../../helpers/axios/axiosInstance";

const signin = async (username: string, password: string, url?: string) => {
  console.log(username, password);
  await axiosInstance()
    .post("/v1/login", {
      username: username,
      password: password,
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .then((data) => {
      console.log(data);
      window.localStorage.setItem("refresh_token", data.refresh_token);
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  if (!url) url = "/";
  Router.push(url);
};

export const LoginBox = (): JSX.Element => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    error: "",
  });

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setUserData({ ...userData, error: "" });

    const username = userData.username;
    const password = userData.password;

    try {
      await signin(username, password);
    } catch (error) {
      console.error(error);
      let errorMessage = "Login failed";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setUserData({ ...userData, error: errorMessage });
    }
  }
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>

        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={(event) => setUserData(Object.assign({}, userData, { username: event.target.value }))}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={(event) => setUserData(Object.assign({}, userData, { password: event.target.value }))}
        />

        <button type="submit">Login</button>

        {userData.error && <p className="error">Error: {userData.error}</p>}
      </form>
    </div>
  );
};
