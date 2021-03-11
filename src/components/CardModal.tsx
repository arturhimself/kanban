import React, { FC } from 'react';
import { KanbanListType } from '@/types/lists';
import { CardEditState } from '@/components/KanbanCard';
import { getFormatedDate } from '@/utils/.';
import {
  Chip,
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Divider,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Edit, Close } from '@material-ui/icons';

interface CardModalProps {
  modal: boolean,
  editCard: boolean,
  handleModalClose: any,
  cardInfo: CardEditState,
  handleEditForm: any,
  handleSaveCard: any,
  handleEditCard: any,
  createDate: number,
  priority: string | undefined,
  lists: KanbanListType[],
}

const useStyles = makeStyles(() => ({
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 10,
    fontSize: 35,
    cursor: 'pointer',
    zIndex: 10,
    '&:hover': {
      color: '#6462e2',
    },
  },
  card: {
    marginBottom: 15,
    cursor: 'pointer',
    transition: '.2s',
    '&:hover': {
      background: '#f5f5f5',
    },
  },
  cardBottom: {
    marginTop: 20,
  },
  editButton: {
    marginRight: 10,
  },
  editIcon: {
    fontSize: 14,
    marginRight: '.2em',
    marginTop: '-.1em',
  },
  priority: {
    width: 30,
    height: 6,
    '&._red': {
      background: 'red',
    },
    '&._yellow': {
      background: '#d4d414',
    },
    '&._green': {
      background: 'green',
    },
  },
  select: {
    marginLeft: '.5rem',
  }
}));

export const CardModal: FC<CardModalProps> = ({
  modal,
  editCard,
  handleModalClose,
  cardInfo,
  handleEditForm,
  handleSaveCard,
  handleEditCard,
  createDate,
  priority,
  lists,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={modal || editCard}
      fullWidth
      maxWidth="sm"
      aria-labelledby="dialog-title"
    >
      <Close onClick={handleSaveCard} className={classes.closeButton} />
      <DialogTitle id="dialog-title">
        <Box mb={1}>
          {priority && (
            <Chip className={`${classes.priority} _${priority}`}></Chip>
          )}
        </Box>
        {!editCard ? (
          cardInfo.name
        ) : (
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            rowsMax={5}
            multiline
            value={cardInfo.name}
            onChange={handleEditForm}
          />
        )}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <div>
          {!editCard ? (
            cardInfo.description
          ) : (
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              rows={3}
              rowsMax={5}
              multiline
              value={cardInfo.description}
              onChange={handleEditForm}
            />
          )}
        </div>
        {editCard && (
          <>
            <Box pt={1} pb={1}>
              Priority:
              <Select
                labelId="priority"
                id="priority"
                name="priority"
                value={cardInfo.priority}
                className={classes.select}
                onChange={handleEditForm}
              >
                <MenuItem value={0}>Usual</MenuItem>
                <MenuItem value={1}>High</MenuItem>
                <MenuItem value={2}>Very high</MenuItem>
              </Select>
            </Box>

            <Box pt={1} pb={1}>
              Status:
              <Select
                labelId="priority"
                id="statusId"
                name="statusId"
                value={cardInfo.statusId}
                className={classes.select}
                onChange={handleEditForm}
              >
                {lists.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </>
        )}
        <DialogContentText className={classes.cardBottom}>
          {!editCard ? (
            <Button
              variant="outlined"
              size="small"
              className={classes.editButton}
              onClick={handleEditCard}
            >
              <Edit className={classes.editIcon} />
              Edit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              className={classes.editButton}
              onClick={handleSaveCard}
            >
              Ok
            </Button>
          )}
          {`Created at: ${getFormatedDate(createDate)}`}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
