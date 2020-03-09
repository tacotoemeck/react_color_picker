import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  ValidatorForm,
  TextValidator,
} from 'react-material-ui-form-validator';

export default function FormDialog(props) {
  const [paletteName, newPaletteName] = React.useState('');
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  function handleChangeNewPalette(e) {
    const paletteName = e.target.value;
    newPaletteName(paletteName);
  }

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
      let allPaletteNames = [];
      props.palettes.forEach(palette =>
        allPaletteNames.push(palette.paletteName.toLowerCase()),
      );
      if (allPaletteNames.includes(value.toLowerCase())) {
        return false;
      } else {
        return true;
      }
    });
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        Choose a Palette Name
      </DialogTitle>
      <ValidatorForm onSubmit={() => props.handleSubmit(paletteName)}>
        <DialogContent>
          <DialogContentText>
            Choose a unique palette name...
          </DialogContentText>

          <TextValidator
            label="Palette Name"
            value={paletteName}
            onChange={handleChangeNewPalette}
            validators={['required', 'isPaletteNameUnique']}
            fullWidth
            margin="normal"
            errorMessages={[
              'Enter Palette Name',
              'This Palette Name is already used',
            ]}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save Palette
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}
