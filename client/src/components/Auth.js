import { useState } from "react";
import { useCookies } from "react-cookie";
function Auth() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogin, setLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  console.log(email, password, confirmPassword);
  const [error, setError] = useState(null);

  console.log(cookies)

  const viewLogin = (status) => {
    setError(null);
    setLogin(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Make Sure Password Match!");
      return;
    }
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("Authtoken", data.token);
      window.location.reload();
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h1>{isLogin ? "Please Log In" : "Please Sign Up!"}</h1>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {!isLogin && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          )}
          <input
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
            type="submit"
            className="create"
          ></input>
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{ backgroundColor: !isLogin ? "white" : "darkgray" }}
          >
            Sign Up!
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{ backgroundColor: isLogin ? "white" : "darkgray" }}
          >
            Login In!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
