import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Material UI Core
import { makeStyles } from '@material-ui/core/styles';
import AppBar         from '@material-ui/core/AppBar';
import ListItem       from '@material-ui/core/ListItem';
import ListItemIcon   from '@material-ui/core/ListItemIcon';
import ListItemText   from '@material-ui/core/ListItemText';
import Menu           from '@material-ui/core/Menu';
import MenuItem       from '@material-ui/core/MenuItem';
import Toolbar        from '@material-ui/core/Toolbar';
import Tooltip        from '@material-ui/core/Tooltip';
import IconButton     from '@material-ui/core/IconButton';
import Typography     from '@material-ui/core/Typography';

// Material UI Icons
import ExpandMore  from '@material-ui/icons/ExpandMore';
import MenuIcon       from '@material-ui/icons/Menu';
import PersonIcon     from '@material-ui/icons/Person';
import PowerSettings  from '@material-ui/icons/PowerSettingsNew';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      fontSize: '.9rem'
    }
  },
  seeItTitle: {
    color: '#e4f3ff',//'#ffba44',
    fontWeight: 'bold'
  },
  menuButton: {
    color: '#333',
    marginRight: theme.spacing(3)
  },
  username: {
    color: '#333',
    fontSize: '.9rem',
    fontWeight: 'bold'
  },
  appBar: {
    // width: `calc(100% - ${drawerWidth}px)`,
    width: '100%',
    marginLeft: drawerWidth,
    background: '#448AFF',
    zIndex: 2000,
  },
}));

const Navbar = ({ drawerOpen, user, setDrawerOpen }:{drawerOpen:any, user:any, setDrawerOpen:()=>void}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (e: any) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);


  return (
    <>
    <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
          <span className={classes.seeItTitle}>Performance Tracking</span> <span style={{ color: '#333' }}> Application Suite</span>
          </Typography>
          { /*user &&
            <IconButton edge="end" onClick={handleMenuClick}>
              <PersonIcon />
              <ExpandMore fontSize="small" />
            </IconButton>*/
          }
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        autoFocus={false}
        style={{zIndex: 2500}}
      >
        <ListItem divider={true}>
          <ListItemText primary={<Typography>Signed in as: <span style={{ fontWeight: 'bold' }}>{/*`${user?.fname} ${user?.lname}`*/}</span></Typography>} />
        </ListItem>
        <MenuItem /*onClick={handleLogout}*/>
          <ListItemIcon>
            <PowerSettings fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;