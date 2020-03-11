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
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

export default function FormDialog(props) {
  const [paletteName, newPaletteName] = React.useState('');
  const [open, setOpen] = React.useState(true);
  const [form, whichForm] = React.useState('form');

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeNewPalette = e => {
    const paletteName = e.target.value;
    newPaletteName(paletteName);
  };

  const showEmojiPicker = () => {
    whichForm('emoji');
  };

  const savePalette = emoji => {
    const newPalette = {
      paletteName: paletteName,
      emoji: emoji.native,
    };
    props.handleSubmit(newPalette);
  };

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
    <div>
      <Dialog open={form === 'emoji'} onClose={props.hideForm}>
        <DialogTitle id="form-dialog-title">
          Choose a palette emoji...
        </DialogTitle>
        <Picker onSelect={savePalette} title="Pick a Palette Emoji" />
      </Dialog>
      <Dialog
        open={form === 'form'}
        onClose={props.hideForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Choose a Palette Name
        </DialogTitle>
        <ValidatorForm onSubmit={() => showEmojiPicker()}>
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
            <Button onClick={props.hideForm} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}
