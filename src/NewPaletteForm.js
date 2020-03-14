import React from 'react';
import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import useStyles from './styles/NewPaletteFormStyles';
import { withStyles } from '@material-ui/styles';

function NewPaletteForm(props) {
  const maxColors = 20;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [currentColor, setColor] = React.useState('teal');
  const [colors, setNewColor] = React.useState(
    props.palettes[0].colors,
  );
  const [color, newColor] = React.useState('');

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function updateCurrentColor(newColor) {
    setColor(newColor.hex);
  }

  function addNewColor(e) {
    const newColor = { color: currentColor, name: color };
    setNewColor(oldColors => [...oldColors, newColor]);
  }

  function handleChange(e) {
    const colorName = e.target.value;
    newColor(colorName);
  }

  function removeColor(colorName) {
    let newColorList = colors.filter(
      color => color.name !== colorName,
    );
    setNewColor([...newColorList]);
  }

  function handleSubmit(newPalette) {
    newPalette.id = newPalette.paletteName
      .toLowerCase()
      .replace(/ /g, '-');
    newPalette.colors = colors;
    props.savePalette(newPalette);
    props.history.push('/');
  }

  function clearPalette() {
    setNewColor([]);
  }

  function addRandomColors() {
    const allColors = props.palettes.map(p => p.colors).flat();
    let random = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[random];
    setNewColor(oldColors => [...oldColors, randomColor]);
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let newArr = arrayMove(colors, oldIndex, newIndex);
    setNewColor(newArr);
  };

  let isPalettFull = colors.length >= maxColors;

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        palettes={props.palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearPalette}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addRandomColors}
              className={classes.button}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            currentColor={currentColor}
            updateCurrentColor={updateCurrentColor}
            addNewColor={addNewColor}
            color={color}
            colors={colors}
            handleChange={handleChange}
            isPalettFull={isPalettFull}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}

export default withStyles(useStyles, { withTheme: true })(
  NewPaletteForm,
);
