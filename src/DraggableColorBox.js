import React from 'react';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4px',
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.5)',
    },
    '@media (max-width: 1200px)': {
      width: '25%',
      height: '20%',
    },
    '@media (max-width: 992px)': {
      width: '50%',
      height: '10%',
    },
    '@media (max-width: 768px)': {
      width: '100%',
      height: '5%',
    },
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    padding: '10px',
    color: 'rgba(0, 0, 0, 0.5)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    transition: 'all 0.3s ease-in-out',
  },
};

const DraggableColorBox = SortableElement(props => {
  return (
    <div
      className={props.classes.root}
      style={{ backgroundColor: props.color }}
    >
      <div className={props.classes.boxContent}>
        <span>{props.name}</span>
        <DeleteOutlinedIcon
          className={props.classes.deleteIcon}
          onClick={props.handleClick}
        />
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);
