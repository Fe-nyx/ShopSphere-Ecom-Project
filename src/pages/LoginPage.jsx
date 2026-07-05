import { useState } from "react";

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
      setEmailError("Email is required");
      isValid = false;
    } else if (!emailRegex.test(trimmedEmail)) {
      setEmailError("Invalid Email");
      isValid = false;
    }

    if (trimmedPassword === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else if (trimmedPassword.length < 8) {
      setPasswordError("Password must contain atleast 8 characters");
      isValid = false;
    } else if (!/[A-Z]/.test(trimmedPassword)) {
      setPasswordError("Password must contain atleast one uppercase letter");
      isValid = false;
    } else if (!/[a-z]/.test(trimmedPassword)) {
      setPasswordError("Password must contain atleast one lowercase letter");
      isValid = false;
    } else if (!/[0-9]/.test(trimmedPassword)) {
      setPasswordError("Password must contain atleast one number");
      isValid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(trimmedPassword)) {
      setPasswordError("Password must contain atleast one special character");
      isValid = false;
    }

    if (isValid) {
      alert("Login Successful");
    }
  }

  return (
    <div className="flex justify-center items-center py-8 md:py-16 px-4">
      <div className="text-[var(--color-coal)] w-full max-w-md border rounded-lg shadow-md p-4 md:p-8 bg-white">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">
          Login
        </h1>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 md:gap-4"
        >
          <label htmlFor="email" className="font-medium">Email</label>

          <input
            placeholder="Enter your email"
            className="input px-1 py-1 md:px-3 md:py-2 w-full"
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          <label htmlFor="password" className="font-medium mt-2">Password</label>

          <input
            placeholder="Enter your password"
            className="input px-1 py-1 md:px-3 md:py-2 w-full"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          <button
            type="submit"
            className="
              py-1 md:py-2
              mt-2
              btn-primary
            "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
