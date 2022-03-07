import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import handleErrors from "../utils/handleErrors";
import { validatePassword } from "../utils/passwordValidator";

export default function SignUp() {
  const { user, setUser, auth, app } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user) router.push("/");
  }, [router, user, loading]);

  async function handleSubmit(e) {
    e.preventDefault();
    // Make sure the useEffect hook doesnt redirect too soon
    setLoading(true);

    // Make sure password has atleast 1 special char, 1 big letter, 1 small letter and one number
    const result = validatePassword(password);
    if (result !== "Valid")
      return setErrorMessages({ ...errorMessages, password: result });

    setUsername(username.trim());

    if (username === "")
      return setErrorMessages({
        ...errorMessages,
        username: "Username is needed",
      });

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      console.log(userCredential);
      console.log("email verification sent!");
      await sendEmailVerification(auth.currentUser, {
        url: "https://firebase-auth-with-nextjs-16rjcqd0e-anemoi4.vercel.app/SignIn",
      });
      setLoading(false);
      router.push("/verify");
    } catch (error) {
      const errors = handleErrors(error.message);
      setErrorMessages(errors);
      console.log(errors);
    }
  }
  return (
    <div className="authform-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h3 className="form-heading">Sign up</h3>
        <div className="input-group">
          <input
            type="text"
            name="username"
            placeholder=" "
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label htmlFor="email">Username</label>
        </div>
        {errorMessages.username && (
          <p className="form-error-message">{errorMessages.username}</p>
        )}
        <div className="input-group">
          <input
            type="text"
            name="email"
            placeholder=" "
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="email">Email</label>
        </div>
        {errorMessages.email && (
          <p className="form-error-message">{errorMessages.email}</p>
        )}
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>
        {errorMessages.password && (
          <p className="form-error-message">{errorMessages.password}</p>
        )}
        <div className="form-submit-wrapper">
          <Link href={"/SignIn"}>
            <a>Already have an account?</a>
          </Link>
          <button className="btn form-btn" type="submit">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
