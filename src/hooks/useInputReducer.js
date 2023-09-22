import { useReducer } from "react";

const ON_BLUR = 0;
const VALUE_CHANGED = 1;
const CLEAR = 2;

const inputReducer = (state, action) => {

  let { value, isTouched, isValid } = state;

  if (action.type === ON_BLUR) {
    isTouched = true;
  }

  if (action.type === VALUE_CHANGED) {
    value = action.value;
    isValid = action.isValid(value);
    isTouched = true;
  }

  if (action.type === CLEAR) {
    value = "";
    isValid = false;
    isTouched = false;
  }

  return {
    value,
    isTouched,
    isValid,
  };
};

const useInputReducer = (isValid) => {
   
  const [inputState, dispatchInput] = useReducer(inputReducer, {
    value: "",
    isTouched: false,
    isValid: false,
  });

  const hasError = inputState.isTouched && !inputState.isValid;

  const onChangeHandler = (event) => {
    dispatchInput({
      type: VALUE_CHANGED,
      value: event.target.value,
      isValid
    });
  };

  const onBlurHandler = () => {
    dispatchInput({ type: ON_BLUR });
  };

  const onClearHandler = () => {
    dispatchInput({ type: CLEAR });
  };

  return {
    onChangeHandler,
    onBlurHandler,
    onClearHandler,
    hasError,
    inputState,
  };
};


export default useInputReducer;