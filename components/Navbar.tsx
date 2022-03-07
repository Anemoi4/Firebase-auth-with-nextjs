import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const { user, setUser, auth, app } = useContext(AppContext);
  const router = useRouter();

  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="main-nav">
      <div className="container">
        <div className="brand-info">
          <h3 style={{ marginRight: "1rem" }} className="nav-heading">
            <Link href={"/"}>brandname</Link>
          </h3>
          <Image
            src="/favicon.ico"
            alt="brandLogo"
            width={30}
            height={30}
            layout="fixed"
          />
        </div>
        <div className="nav-links">
          {!user && (
            <div className="btn btn-auth">
              <Link href={"/SignUp"}> Sign up</Link>
            </div>
          )}
          {!user && (
            <div className="btn btn-auth">
              <Link href={"/SignIn"}>Sign In</Link>
            </div>
          )}
          {user && (
            <div className="btn btn-auth btn-logout" onClick={logout}>
              Log Out
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
