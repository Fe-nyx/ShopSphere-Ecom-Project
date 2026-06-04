import { useState } from "react"



function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    setEmailError("");
    setPasswordError("");

    let isValid = true;
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (trimmedEmail === "") {
      setEmailError("Email is required")
      isValid = false;
    }
    else if (!emailRegex.test(trimmedEmail)) {
      setEmailError("Invalid Email")
      isValid = false;
    }

    if (trimmedPassword === "") {
      setPasswordError("Password is required")
      isValid = false;
    }

    else if (trimmedPassword.length < 8) {
      setPasswordError("Password must contain atleast 8 characters")
      isValid = false;
    }

    else if (!(/[A-Z]/.test(trimmedPassword))) {
      setPasswordError("Password must contain atleast one uppercase letter")
      isValid = false;
    }

    else if (!(/[a-z]/.test(trimmedPassword))) {
      setPasswordError("Password must contain atleast one lowercase letter")
      isValid = false;
    }

    else if (!(/[0-9]/.test(trimmedPassword))) {
      setPasswordError("Password must contain atleast one number")
      isValid = false;
    }

    else if (!(/[!@#$%^&*(),.?":{}|<>]/.test(trimmedPassword))) {
      setPasswordError("Password must contain atleast one special character")
      isValid = false;
    }

    if (isValid) {
      alert("Login Successful")
    }
  }


  return (
    <>
      <h1>Login</h1>

      <form noValidate onSubmit={handleSubmit}>

        <input
          className="border"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        {emailError && <p>{emailError}</p>}

        <input
          className="border"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {passwordError && <p>{passwordError}</p>}

        <button type="submit" >
          Login
        </button>

      </form>

    </>
  )
}

export default LoginPage