import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setSort } from '@/redux/actions/sort';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
  },
}));

export const KanbanSort: React.FC = () => {
  const dispatch = useDispatch();
  const [labelSort, setLabelSort] = useState('default');
  const classes = useStyles();

  const handleSort = (value: string) => {
    const [type, order] = value.split('_');
    dispatch(setSort({ type, order }));
    setLabelSort(value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="sort-label">Sort</InputLabel>
      <Select
        labelId="sort-label"
        id="sort"
        label="Sort"
        value={labelSort}
        onChange={(ev) => handleSort(ev.target.value as string)}
      >
        <MenuItem value="default">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"createDate_asc"}>by date (new)</MenuItem>
        <MenuItem value={"createDate_desc"}>by date (old)</MenuItem>
        <MenuItem value={"priority_asc"}>by priority (high)</MenuItem>
        <MenuItem value={"priority_desc"}>by priority (low)</MenuItem>
      </Select>
    </FormControl>
  );
};
