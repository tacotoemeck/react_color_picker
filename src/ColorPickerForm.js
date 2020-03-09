import React from 'react';
import Button from '@material-ui/core/Button';
import {
  ValidatorForm,
  TextValidator,
} from 'react-material-ui-form-validator';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';

const useStyles = makeStyles(() => ({
  picker: {
    width: '100% !important',
    marginTop: '2rem',
  },
  addColor: {
    width: '100%',
    padding: '1rem',
    marginTop: '1rem',
    fontSize: '2rem',
  },
  colorNameInput: {
    width: '100%',
    height: '75px',
  },
}));

function ColorPickerForm(props) {
  const classes = useStyles();
  React.useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', value => {
      let allColorNames = [];
      props.colors.forEach(color => allColorNames.push(color.name));
      if (allColorNames.includes(value)) {
        return false;
      } else {
        return true;
      }
    });
    ValidatorForm.addValidationRule('isColorUnique', value => {
      let allColors = [];

      props.colors.forEach(color => allColors.push(color.color));
      if (allColors.includes(value)) {
        return false;
      } else {
        return true;
      }
    });
  });
  return (
    <div>
      <ChromePicker
        color={props.currentColor}
        onChangeComplete={props.updateCurrentColor}
        className={classes.picker}
      />
      <ValidatorForm onSubmit={props.addNewColor}>
        <TextValidator
          value={props.color}
          onChange={props.handleChange}
          margin="normal"
          placeholder="Add Color Namenpm"
          variant="filled"
          className={classes.colorNameInput}
          validators={[
            'required',
            'isColorNameUnique',
            'isColorUnique',
          ]}
          errorMessages={[
            'Enter color name',
            'This name is already used',
            'You have already used this coloe',
          ]}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={props.isPalettFull}
          className={classes.addColor}
          style={{
            backgroundColor: props.isPalettFull
              ? 'gray'
              : props.currentColor,
          }}
        >
          {props.isPalettFull ? 'Palette is full' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ColorPickerForm;
