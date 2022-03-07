import React, { useState, useContext, useEffect } from "react";
import {
  applyActionCode,
  confirmPasswordReset,
  verifyPasswordResetCode,
} from "firebase/auth";
import { AppContext } from "../contexts/AppContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { validatePassword } from "../utils/passwordValidator";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [actionData, setActionData] = useState({
    oobCode: "",
    mode: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    password: "",
  });
  const [validCode, setValidCode] = useState(false);
  const { auth } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      let url = new URL(window.location.href);
      let params = new URLSearchParams(url.search);
      let oobCode = params.get("oobCode");
      let mode = params.get("mode");

      setActionData({
        mode,
        oobCode,
      });

      if (mode === "passwordReset") {
      } else if (mode === "verifyEmail") {
        handleVerifyEmail(auth, oobCode);
      }
    }
  }, []);

  async function handleVerifyEmail(auth, actionCode) {
    try {
      const res = await applyActionCode(auth, actionCode);
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePasswordReset(e) {
    try {
      const res = await verifyPasswordResetCode(auth, actionData.oobCode);
      const result = validatePassword(newPassword);
      if (result !== "Valid")
        return setErrorMessages({ ...errorMessages, password: result });
      await confirmPasswordReset(auth, actionData.oobCode, newPassword);
      router.push("/SignIn");
    } catch (error) {
      console.log(error);
    }
  }

  if (actionData.mode === "resetPassword") {
    return (
      <div className="authform-wrapper">
        <div className="container">
          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <h3 className="form-heading">Password Reset</h3>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder=" "
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <label htmlFor="password">New Password</label>
            </div>
            {errorMessages.password && (
              <p className="form-error-message">{errorMessages.password}</p>
            )}
            <div
              style={{ justifyContent: "flex-end" }}
              className="form-submit-wrapper"
            >
              <button className="btn form-btn" onClick={handlePasswordReset}>
                Reset password
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else if (actionData.mode === "verifyEmail") {
    return (
      <div className="container">
        <div className="card">
          <h3 className="header">
            Your email address has been verified now! <br />
            Please continue to
            <Link href={"/SignIn"}> Sign In</Link>
          </h3>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
