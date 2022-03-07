export default function handleErrors(err) {
  const errors = { email: "", password: "", username: "", verification: "" };
  console.log("Handling errors...: ", err);

  if (/auth\/wrong-password/.test(err)) {
    console.log("I got to here");
    errors.password = "Invalid password";
    return errors;
  }

  if (/auth\/user-not-found/.test(err)) {
    errors.email = "Email not registered";
    return errors;
  }

  if (/auth\/email-already-in-use/.test(err)) {
    errors.email = "Email already in use";
    return errors;
  }

  if (/auth\/weak-password/.test(err)) {
    errors.password = "Password should be at least 6 characters";
    return errors;
  }

  if (/auth\/missing-email/.test(err)) {
    errors.email = "Please enter an email";
    return errors;
  }

  return errors;
}
