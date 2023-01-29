import { useState } from "react";

const UseInput = (validateValue) => {
  const [enteredValue, setenteredValue] = useState("");
  const [isElementTouched, setisElementTouched] = useState(false);

  const onChangeHandler = (event) => {
    setenteredValue(event.target.value);
  };

  const onBlurHandler = () => {
    setisElementTouched(true);
  };

  const isEnteredValueisValid = validateValue(enteredValue);
  return {
    value: enteredValue,
    isValid: isEnteredValueisValid,
    hasError: !isEnteredValueisValid && isElementTouched,
    onChangeHandler,
    onBlurHandler,
  };
};

export default UseInput;
