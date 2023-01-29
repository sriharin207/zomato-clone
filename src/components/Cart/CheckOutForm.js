import React, { useState } from "react";
import UseInput from "../hooks/useInput";
import classes from "./CheckOutForm.module.css";

const CheckOutForm = (props) => {
  const [formValidity, setformValidity] = useState({
    name: true,
    address: true,
    pincode: true,
    mobileNum: true,
  });
  //Conts for Name
  const {
    value: enteredName,
    isValid: isNameValid,
    hasError: isNameInValid,
    onChangeHandler: onNameChangeHandler,
    onBlurHandler: onNameBlurHandler,
  } = UseInput((value) => value.trim() !== "");

  //Conts for Address
  const {
    value: enteredAdd,
    isValid: isAddValid,
    hasError: isAddInValid,
    onChangeHandler: onAddChangeHandler,
    onBlurHandler: onAddBlurHandler,
  } = UseInput((value) => value.trim() !== "");

  //Conts for Address
  const {
    value: enteredPin,
    isValid: isPinValid,
    hasError: isPinInValid,
    onChangeHandler: onPinChangeHandler,
    onBlurHandler: onPinBlurHandler,
  } = UseInput(
    (value) =>
      value.trim() !== "" &&
      !isNaN(value) &&
      Number(value) > 0 &&
      value.length === 6
  );

  //Conts for Mobile
  const {
    value: enteredMob,
    isValid: isMobValid,
    hasError: isMobInValid,
    onChangeHandler: onMobChangeHandler,
    onBlurHandler: onMobBlurHandler,
  } = UseInput(
    (value) =>
      value.trim() !== "" &&
      !isNaN(value) &&
      Number(value) > 0 &&
      value.length === 10
  );

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setformValidity({
      name: isNameValid,
      address: isAddValid,
      pincode: isPinValid,
      mobileNum: isMobValid,
    });

    if (isNameValid && isAddValid && isPinValid && isMobValid) {
      props.submitData({
        name: enteredName,
        address: enteredAdd,
        pincode: enteredPin,
        mobileNum: enteredMob,
      });
    }
    return;
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.formEle}>
          <div className={classes.Ele}>
            <label htmlFor="name">
              Name<span> *</span>
            </label>
            <input
              type="text"
              name="name"
              value={enteredName}
              onChange={onNameChangeHandler}
              onBlur={onNameBlurHandler}
              className={isNameInValid ? classes.inputErr : ""}
            />
            {!formValidity.name && (
              <p className={classes.errtxt}>Please enter a valid name</p>
            )}
          </div>
          <div className={classes.Ele}>
            <label htmlFor="address">
              Address<span> *</span>
            </label>
            <input
              type="text"
              name="address"
              value={enteredAdd}
              onChange={onAddChangeHandler}
              onBlur={onAddBlurHandler}
              className={isAddInValid ? classes.inputErr : ""}
            />
            {!formValidity.address && (
              <p className={classes.errtxt}>Please enter a valid Address</p>
            )}
          </div>
          <div className={classes.Ele}>
            <label htmlFor="pincode">
              Pincode<span> *</span>
            </label>
            <input
              type="number"
              name="pincode"
              value={enteredPin}
              onChange={onPinChangeHandler}
              onBlur={onPinBlurHandler}
              className={isPinInValid ? classes.inputErr : ""}
            />
            {!formValidity.pincode && (
              <p className={classes.errtxt}>Please enter a valid PinCode</p>
            )}
          </div>
          <div className={classes.Ele}>
            <label htmlFor="mobileNumber">
              Mobile Number<span> *</span>
            </label>
            <input
              type="number"
              name="mobileNumber"
              value={enteredMob}
              onChange={onMobChangeHandler}
              onBlur={onMobBlurHandler}
              className={isMobInValid ? classes.inputErr : ""}
            />
            {!formValidity.mobileNum && (
              <p className={classes.errtxt}>
                Please enter a valid Mobile Number
              </p>
            )}
          </div>
        </div>
        <div className={classes.btn}>
          <button type="button" onClick={props.close}>
            Cancel
          </button>
          <button type="submit">Confirm</button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutForm;
