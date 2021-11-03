import React, { useState, useContext } from "react";
import AuthContext from "../../contexts/auth";

export const LoginBox = (): JSX.Element => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    error: "",
  });

  const { loginUser } = useContext(AuthContext);

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setUserData({ ...userData, error: "" });

    const username = userData.username;
    const password = userData.password;

    try {
      await loginUser(username, password);
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
