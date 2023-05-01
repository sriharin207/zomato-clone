import React from "react";
import RootLayout from "../Layout/RootLayout";
import classes from "./ErrorPage.module.css";
import bgimg from "../../images/errorImage.jpg";
import { useRouteError } from "react-router-dom";
import CustomError from "./CustomError";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <RootLayout />
      <div className={classes.errorContent}>
        {error.status && <CustomError message={error.data} />}
        {!error.status && (
          <img src={bgimg} alt="Page not found on the server" />
        )}
      </div>
    </>
  );
};

export default ErrorPage;
