import React from "react";
import { Controller, useFormContext } from "react-hook-form";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

import useStyles from "theme/jss/material-kit-react/components/customInputStyle";
import useDefault from "util/setDefaultProps";

const CustomInput = (props: CustomInputType) => {
  const newProps = useDefault(props, { inputRootCustomClasses: undefined });

  const { control } = useFormContext();

  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    defaultValue,
  } = newProps;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white,
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined,
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white,
  });
  var formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }
  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + " " + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Controller
        name={id}
        control={control}
        as={<Input />}
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        defaultValue={defaultValue}
        {...inputProps}
      />
    </FormControl>
  );
};

type CustomInputType = {
  labelText?: React.ReactNode;
  labelProps?: { [key: string]: any };
  id?: string;
  inputProps?: { [key: string]: any };
  formControlProps?: { [key: string]: any };
  inputRootCustomClasses?: string;
  error?: boolean;
  success?: boolean;
  white?: boolean;
  defaultValue?: any;
};

export default CustomInput;
