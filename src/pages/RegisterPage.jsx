import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { register } from "../utils/authAPI";
import { useLocale } from "../contexts/LocaleContext";

const LoginPage = () => {
  const [name, nameInputHandler] = useInput("");
  const [email, emailInputHandler] = useInput("");
  const [password, passwordInputHandler] = useInput("");
  const [confirmPassword, confirmPasswordInputHandler] = useInput("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const navigate = useNavigate();
  const { locale } = useLocale();

  async function submitHandler(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError({ error: false, message: "" });
      passwordConfirmation();

      const response = await register(name, email, password);

      if (response.status === "fail") throw new Error(response.message);

      setLoading(false);
      navigate("/auth/login");
    } catch (error) {
      console.error("Login error: ", error);
      setError({ error: true, message: error.message });
      setLoading(false);
    }
  }

  function passwordConfirmation() {
    if (password !== confirmPassword)
      throw new Error(
        locale === "en" ? "Password confirmation doesn't match" : "Konfirmasi password tidak cocok"
      );
  }

  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <h2 className="auth-form-title">Register</h2>
      <div className="auth-form-control">
        <label htmlFor="name">{locale === "en" ? "Name" : "Nama"}</label>
        <input type="name" id="name" value={name} onInput={nameInputHandler} required />
      </div>
      <div className="auth-form-control">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onInput={emailInputHandler} required />
      </div>
      <div className="auth-form-control">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={password}
          onInput={passwordInputHandler}
          required
        />
      </div>
      <div className="auth-form-control">
        <label htmlFor="password"> {locale === "en" ? "Confirm" : "Konfirmasi"} Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onInput={confirmPasswordInputHandler}
          required
        />
      </div>
      <p>
        {locale === "en" ? "Already have an account?" : "Sudah punya akun?"}{" "}
        <Link to={"/auth/login"} className="txt-blue">
          Login
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
