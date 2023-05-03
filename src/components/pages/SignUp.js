import React from "react";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import classes from "./Login.module.css";

const Signup = () => {
  const errResponse = useActionData();

  return (
    <div className={classes.container}>
      <Form method="POST" className={classes.form}>
        <h1 className={classes.title}>Sign Up</h1>
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
          <label htmlFor="userName">
            First Name<span> *</span>
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your name"
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
          <Link to="/" className={classes.signup}>
            Login Page
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

export default Signup;

export async function signupAction({ request }) {
  const data = await request.formData();
  const newUserDetails = {
    mobileNumber: data.get("mobileNumber"),
    password: data.get("password"),
    firstName: data.get("firstName"),
  };
  const backendRes = await fetch("/api/createUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserDetails),
  });

  if (backendRes.ok) {
    return redirect("/login");
  } else {
    return backendRes;
  }
}
