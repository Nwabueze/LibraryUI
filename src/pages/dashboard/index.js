import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import SearchIcon from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import InputBase from '@material-ui/core/InputBase';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import axios from 'axios'
import userData from './util'
import FormControl from '@mui/material/FormControl';
import { TextField, Button } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
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
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

/*
const userData = async () => {
  const d = await axios.get('/data');
  return d.data;
}
*/
export default function Dashboard({ ...props }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  
  const [usedata, setUserData] = useState({});

  /*
  useEffect(() => {
    //const d = axios.get('/data');
    userData();
  },[]);
  */



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

 


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    
  })

  const [isbn, setISBN] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  

  const handleISBN = (str) => {
    if(!str){
      setISBN("");
      return;
    }

    setISBN(str);
  }

  const handleTitle = (str) => {
    if(!str){
      setTitle("");
      return;
    }

    setTitle(str);
  }

  const handleAuthor = (str) => {
    if(!str){
      setAuthor("");
      return;
    }

    setAuthor(str);
  }

  const handleYear = (str) => {
    if(!str){
      setYear("");
      return;
    }

    setYear(str);
  }

  const addBook = async () => {
    if(!isbn || !title || !author || !year){
      alert("Could not submit. Invalid input detected");
      return;
    }
    const book = {"isbn": isbn, "title": title, "author": author, "year": year};
    const res = await axios.post("/library/book/add", book);
    if(res){
      if(res.data == 1){
        alert("Book has been added");
      }else{
        alert("Could not submit book");
      }
    }
  }

  // Borrow a book | take a book from library
  const borrowBook = async () => {
    if(!isbn){
      alert("No ISBN given");
      return;
    }

    const res = await axios.put(`/library/reader/add/${isbn}`);
    if(res){
      if(res.data == 1){
        alert("You have successfully borrowed a book");
      }else{
        alert("Could not borrow book");
      }
    }
  }

  const showMyBooks = () => {
    props.history.push('/notification');
  }

  const returnBorrowedBook = async () => {
    if(!isbn){
      alert("No ISBN given");
      return;
    }

    const res = await axios.delete(`/library/reader/add/${isbn}`);
    if(res){
      if(res.data == 1){
        alert("You have successfully returned a book");
      }else{
        alert("Request completed. No changes made!! No book was returned");
      }
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.grow}>
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
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      
      
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {renderMobileMenu}
      {renderMenu}
      </div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div style={{"width": "80%","maxWidth":"300px", "padding":"15px", "border":"1px solid gray","marginTop":"50px"}}>
          <Typography variant="body2">
            Veiw all books you have borrowed so far. Please remember to return the books
            </Typography>
            <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={ showMyBooks }
          >
            Add Book
          </Button>
        </div>

        <div style={{"width": "80%","maxWidth":"300px", "padding":"15px", "border":"1px solid gray","marginTop":"50px"}}>
          <Typography variant="h5">Add a new Book</Typography>
          <TextField
            label="Book ISBN"
            helperText={"book ISBN"}
            fullWidth
            onChange={(e) => {handleISBN(e.target.value)}}
          />

          <TextField
            label="Book Title"
            fullWidth
            helperText={"book Title"}
            onChange={(e) => {handleTitle(e.target.value)}}
          />

          <TextField
          fullWidth
            label="Book Author"
            helperText={"book Author"}
            onChange={(e) => {handleAuthor(e.target.value)}}
          />
  
        <TextField
        fullWidth
          label="Book Year"
          helperText={"book Year"}
          onChange={(e) => {handleYear(e.target.value)}}
        />

        <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={ addBook }
          >
            Add Book
          </Button>

      </div>


      <div style={{"width": "80%","maxWidth":"300px", "padding":"15px", "border":"1px solid gray","marginTop":"50px"}}>
          <Typography variant="h5">Borrow book from library</Typography>
          <TextField
            label="Enter Book ISBN"
            helperText={"book ISBN"}
            fullWidth
            onChange={(e) => {handleISBN(e.target.value)}}
          />

        <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={ borrowBook }
          >
            Borrow Book
          </Button>

      </div>


      <div style={{"width": "80%","maxWidth":"300px", "padding":"15px", "border":"1px solid gray","marginTop":"50px"}}>
          <Typography variant="h5">Return borrowed book</Typography>
          <TextField
            label="Enter Book ISBN"
            helperText={"book ISBN"}
            fullWidth
            onChange={(e) => {handleISBN(e.target.value)}}
          />

        <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={ returnBorrowedBook }
          >
            Return Borrowed Book
          </Button>

      </div>
      </main>
    </div>
  );
}
