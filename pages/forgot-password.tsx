import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useContext, useState } from "react";
import { app } from "../firebase/clientApp";
import handleErrors from "../utils/handleErrors";
import { AppContext } from "../contexts/AppContext";

export default function PasswordReset() {
  const { user, setUser, auth, app } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    verification: "",
  });

  async function handlePasswordChange(e) {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: "https://firebase-auth-with-nextjs-16rjcqd0e-anemoi4.vercel.app/SignIn",
      });
      setMessage("Password reset has been sent to your email address!");
      setIsSent(true);
      setErrors({ ...errors, email: "" });
    } catch (error) {
      const errors = handleErrors(error.message);
      setErrors(errors);
    }
  }
  return (
    <div className="authform-wrapper">
      <div className="container">
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <h3 className="form-heading">Password Reset</h3>
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
          {errors.email && <p className="form-error-message">{errors.email}</p>}
          {message && <p className="form-message">{message}</p>}
          <div
            style={{ justifyContent: "flex-end" }}
            className="form-submit-wrapper"
          >
            {!isSent && (
              <button className="btn form-btn" onClick={handlePasswordChange}>
                Reset password
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
