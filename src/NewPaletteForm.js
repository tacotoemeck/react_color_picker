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
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';



const drawerWidth = 340;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        height: 'calc(100vh - 64px)',
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));


export default function NewPaletteForm() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [currentColor, setColor] = React.useState('teal');
    const [colors, setNewColor] = React.useState([]);
    const [color, newColor] = React.useState('');

    React.useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
            let allColorNames = [];
            colors.forEach(color => allColorNames.push(color.name))
            if (allColorNames.includes(value)) {
                return false;
            } else {
                return true
            }
        })
        ValidatorForm.addValidationRule('isColorUnique', (value) => {
            let allColors = [];

            colors.forEach(color => allColors.push(color.color))
            if (allColors.includes(value)) {
                return false;
            } else {
                return true
            }
        })
    })

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
        const newColor = { color: currentColor, name: color }
        setNewColor(oldColors => [...oldColors, newColor])
        newColor(color = '')
        console.log(color)
    }

    function handleChange(e) {
        const colorName = e.target.value;
        newColor(colorName);
    }

    return (
        <div className={classes.root} >
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Persistent drawer
            </Typography>
                </Toolbar>
            </AppBar>
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
                <Typography variant='h4'>Design Your Palette</Typography>
                <div>
                    <Button variant='contained' color='secondary'>Clear Palette</Button>
                    <Button variant='contained' color='primary'>Random Color</Button>
                </div>

                <ChromePicker
                    color={currentColor}
                    onChangeComplete={updateCurrentColor}
                />



                <ValidatorForm onSubmit={addNewColor} >
                    <TextValidator
                        value={color}
                        onChange={handleChange}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['Enter color name', 'This name is already used', 'You have already used this coloe']}
                    />
                    <Button
                        variant='contained'
                        type='submit'
                        color='primary'
                        style={{ backgroundColor: currentColor }}

                    >Add Color</Button>
                </ValidatorForm>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />

                {colors.map(color => (
                    <DraggableColorBox color={color.color} name={color.name} />
                ))}

            </main>
        </div >
    );
}

