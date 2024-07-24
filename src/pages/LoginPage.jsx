import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { login } from "../utils/authAPI";
import { putAccessToken } from "../utils/authAPI";
import { useAuth } from "../contexts/AuthContext";
import { useLocale } from "../contexts/LocaleContext";

const LoginPage = () => {
  const [email, emailInputHandler] = useInput("");
  const [password, passwordInputHandler] = useInput("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const { fetchUserData } = useAuth();
  const navigate = useNavigate();
  const { locale } = useLocale();

  async function submitHandler(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError({ error: false, message: "" });

      const response = await login(email, password);

      if (response.status === "fail") throw new Error(response.message);

      putAccessToken(response.data.accessToken);
      await fetchUserData();
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Login error: ", error);
      setError({ error: true, message: error.message });
      setLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <h2 className="auth-form-title">Login</h2>
      <div className="auth-form-control">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onInput={emailInputHandler} required />
      </div>
      <div className="auth-form-control">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onInput={passwordInputHandler}
          required
        />
      </div>
      <p>
        {locale === "en" ? "Don't have an account?" : "Belum punya akun?"}{" "}
        <Link to={"/auth/register"} className="txt-blue">
          Register
        </Link>
      </p>

      {error.error && <div className="auth-form-message danger"> {error.message} </div>}

      <button type="submit" className="auth-form-submit button">
        {loading ? <div className="spinning-load"></div> : locale === "en" ? "Submit" : "Kirim"}
      </button>
    </form>
  );
};

export default LoginPage;
