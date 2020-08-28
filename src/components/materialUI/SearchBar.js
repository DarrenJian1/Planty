import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { red } from '@material-ui/core/colors';
//import SearchOutlined from '@ant-design/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    
      },
      marginTop: theme.spacing(2),
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    trashIcon: {
        marginTop: theme.spacing(2),
    },
    trashRed: {
        color: '#cd2c2c',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
  }),
);

export default function SearchBar(props) {
  const classes = useStyles();
  const deletePlants = {
    margin: '0 20px',
    padding: '0',
    background: 'transparent',
    border: 'none',
    //borderRadius: '5px',
}
    const initialSortBy = localStorage.getItem('sortBy')
  const [sort, setSort] = React.useState(initialSortBy);
  const [search, setSearch] = React.useState('');
//   const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     setAge(event.target.value as string);
//   };
    const handleChange = (e) => {
        setSort(e.target.value);
        localStorage.setItem('sortBy', e.target.value);
        props.handleChange(e.target.value);
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        props.handleSearch(e.target.value);
    }



  return (
    <Toolbar>
    <div className={classes.search}>
        <div className={classes.searchIcon}>
            {/* <SearchOutlined /> */}
            <SearchIcon/>
        </div>
        <InputBase
            placeholder="Search…"
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={search}
            onChange={handleSearchChange}
        />
    </div>
    <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          onChange={handleChange}
        >
          <MenuItem value={'name'}>Name</MenuItem>
          <MenuItem  value={'DOLW'}>Date</MenuItem>
        </Select>
    </FormControl>
    <div className={classes.trashIcon}>
        <button key="More" className={props.deleteMode ? (classes.trashRed) : ""} onClick={props.togglePop} style = {deletePlants}>
            {/* <SettingOutlined /> */}
            <DeleteIcon/>
        </button>
    </div>
    
    </Toolbar>
  );

}
