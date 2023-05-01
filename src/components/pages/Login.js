import React from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import classes from "./Login.module.css";

const Login = () => {
  const errResponse = useActionData();

  return (
    <div className={classes.container}>
      <Form method="POST" className={classes.form}>
        <h1 className={classes.title}>Login</h1>
        <div className={classes.formEle}>
          <label htmlFor="mobileNumber">
            Mobile Number<span> *</span>
          </label>
          <input
            type="number"
            name="mobileNumber"
            placeholder="Enter mobile number"
            required={true}
          />
        </div>

        <div className={classes.formEle}>
          <label htmlFor="password">
            Password<span> *</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required={true}
          />
        </div>

        <div className={classes.btns}>
          <Link to="/signup" className={classes.signup}>
            Sign Up Page
          </Link>
          <button type="submit" className={classes.submit}>
            Submit
          </button>
        </div>
        {errResponse && errResponse.message && (
          <p className={classes.err}>{errResponse.message}</p>
        )}
      </Form>
    </div>
  );
};

export default Login;

export async function loginAction({ request }) {
  const data = await request.formData();
  const userLoginDetails = {
    mobileNumber: data.get("mobileNumber"),
    password: data.get("password"),
  };
  const backendRes = await fetch(
    "http://localhost:3001/api/verifyLoginDetails",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLoginDetails),
    }
  );

  if (backendRes.ok) {
    const res = await backendRes.json();
    localStorage.setItem("userlogin", JSON.stringify(res));
    return redirect("/items")
  } else {
    return backendRes;
  }
}
