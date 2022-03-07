import Link from "next/link";
import React from "react";

export default function verify() {
  return (
    <div className="container">
      <div className="card">
        <p>Your user account has been created!</p>
        <p>
          Verfication message has been sent to your email address, please verify
          it before continuing
        </p>
      </div>
    </div>
  );
}
