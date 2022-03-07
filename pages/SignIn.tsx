import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { GoogleLogin } from "react-google-login";
import handleErrors from "../utils/handleErrors";

function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    const providerData = firebaseUser.providerData;
    for (let i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId === GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser
      ) {
        return true;
      }
    }
  }
  return false;
}

export default function SignIn() {
  const { user, setUser, app, firebaseUser, auth } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    verification: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [router, user]);

  async function googleLoginSuccess(res) {
    try {
      const googleUser = res.tokenId;
      if (!isUserEqual(googleUser, firebaseUser)) {
        const credential = GoogleAuthProvider.credential(googleUser);
        signInWithCredential(auth, credential);
        router.push("/");
      } else {
        console.log("user already signed-in to Firebase");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function googleLoginFailure(res) {
    console.log(res);
    console.log("Google sign in was unsuccessful. Try again later", res);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userCredential.user.emailVerified) {
        return setErrors({
          ...errors,
          verification:
            "We have sent verification message to your email address. Please verify that you own this email adress",
        });
      }
      router.push("/");
    } catch (error) {
      const errors = handleErrors(error.message);
      setErrors(errors);
    }
  }

  async function handlePasswordChange(e) {
    await sendPasswordResetEmail(auth, email, {
      url: "https://firebase-auth-with-nextjs-16rjcqd0e-anemoi4.vercel.app/SignIn",
    });
  }

  return (
    <div className="authform-wrapper">
      <form onSubmit={handleSubmit} className="auth-form">
        <h3 className="form-heading">Sign in</h3>
        <div className="input-group">
          <input
            type="text"
            name="email"
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </div>
        {errors.email && <p className="form-error-message">{errors.email}</p>}
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>
        {errors.password && (
          <p className="form-error-message">{errors.password}</p>
        )}
        {errors.verification && (
          <p className="form-error-message">{errors.verification}</p>
        )}
        <div className="password-link">
          <Link href={"/forgot-password"}>Forgot your password?</Link>
        </div>
        <div className="form-submit-wrapper">
          <Link href={"/SignUp"}>
            <a>Don&apos;t have an account yet?</a>
          </Link>
          <button className="btn form-btn" type="submit">
            Sign In
          </button>
        </div>
        <div className="google-login-wrapper">
          <GoogleLogin
            className="btn-google"
            clientId="788264538920-lvv0shh0se9sdoiehmbbh320mtfph833.apps.googleusercontent.com"
            onSuccess={googleLoginSuccess}
            onFailure={googleLoginFailure}
            cookiePolicy="single_host_origin"
          />
        </div>
      </form>
    </div>
  );
}
