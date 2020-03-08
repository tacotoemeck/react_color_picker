import React from 'react';
import Button from '@material-ui/core/Button';
import {
  ValidatorForm,
  TextValidator,
} from 'react-material-ui-form-validator';

import { ChromePicker } from 'react-color';

function ColorPickerForm(props) {
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
      />
      <ValidatorForm onSubmit={props.addNewColor}>
        <TextValidator
          value={props.color}
          onChange={props.handleChange}
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
