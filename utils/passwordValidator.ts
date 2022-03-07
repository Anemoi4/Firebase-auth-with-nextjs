export function validatePassword(password: string) {
  let hasLower = new RegExp("^(?=.*[a-z]).+$");
  let hasUpper = new RegExp("^(?=.*[A-Z]).+$");
  // prettier-ignore
  let hasNumber = new RegExp("^(?=.*[0-9]).+$");
  let hasSpecial = new RegExp("^(?=.*[-+_!@#$%^&*.,?]).+$");
  let has6Char = new RegExp("^[a-zA-Z0-9-+_!@#$%^&*.,?]{6,}$");

  if (!has6Char.test(password))
    return "Password must contain atleast 6 characters";

  if (!hasLower.test(password))
    return "Password must contain atleast 1 lowercase letter";

  if (!hasSpecial.test(password))
    return "Password must contain atleast 1 special letter (-+_!@#$%^&*.,?)";

  if (!hasUpper.test(password))
    return "Password must contain atleast 1 uppercase letter";

  if (!hasNumber.test(password))
    return "Password must contain atleast 1 number";

  return "Valid";
}
