import React from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import useStyles from "theme/jss/material-kit-react/components/customCheckBoxRadioSwtich";

const Toggle = (props: ToggleProps) => {
  const classes = useStyles();
  const { checked, label, setChecked } = props;
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
          value="orderByCitation"
          classes={{
            switchBase: classes.switchBase,
            checked: classes.switchChecked,
            thumb: classes.switchIcon,
            track: classes.switchBar,
          }}
        />
      }
      classes={{
        label: classes.label,
      }}
      label={label}
      className={classes.formControl}
    />
  );
};

type ToggleProps = {
  label: string;
  checked: boolean;
  setChecked: (val: boolean) => any;
};

export default Toggle;
