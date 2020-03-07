import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { Link } from 'react-router-dom';
import {
  ValidatorForm,
  TextValidator,
} from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import arrayMove from 'array-move';
import PaletteFormNav from './PaletteFormNav';

function ColorPickerForm(props) {
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
