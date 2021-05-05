import React from 'react';
// Material UI Core
import { makeStyles }     from '@material-ui/core/styles';
import { Drawer, Tooltip, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
// Material UI Icons
import ChevronLeftIcon  from '@material-ui/icons/ChevronLeft';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
// Custom
// import DrawerSubList from './DrawerSubList';

const useStyles = makeStyles(theme => ({
  titleContainer: {
    display: 'flex',
    margin: '0 auto'
  },
  title: {
    fontSize: '1rem'
  },
  drawerPaper: {
    color: '#448AFF',
    background: '#fff',
    width: 240,
    display: 'flex',
    alignItems: 'center'
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerHeader: {
    display: "flex",
    width: '100%',
    alignItems: 'center',
    padding: "6px",
    justifyContent: "flex-end"
  },
  logo: {
    marginTop: 'auto',
    marginBottom: '0.5rem'
  }
}));

const AppDrawer = (props: any) => {
  const classes = useStyles();
  const { drawerOpen, onClickaway } = props;

  return (
        <Drawer 
          anchor="right"
          open={drawerOpen}
          classes={{ paper: classes.drawerPaper }}
          className={classes.drawer}
          ModalProps={{ onBackdropClick: onClickaway }}
        >
          <div className={classes.drawerHeader}>
            <div className={classes.titleContainer}>
              <Typography noWrap className={classes.title}>
                Performance Tracking 
              </Typography>
            </div>
            <Tooltip title="Close Menu" placement="right">
              <IconButton onClick={onClickaway} color='inherit' style={{ border: '1px solid' }}>
                <ChevronLeftIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div>
            <Divider style={{ background: '#555' }} />
            <List>
              {/* { !undefinedPages && pages.filter(p => p.secondaryText === 'Maintenence') ?
                (<React.Fragment>
                    <DrawerSubList 
                      handleDrawerClose={() => handleDrawerClose(false)} 
                      pages={!undefinedPages ? [...pages.filter(p => p.secondaryText === 'Dashboard')]: []}
                      logo='dashboard'
                      title='Dashboard Panel'
                    />
                    <Divider style={{ background: '#555' }} />
                  </React.Fragment>) : null
              }
              <DrawerSubList 
                handleDrawerClose={() => handleDrawerClose(false)} 
                pages={!undefinedPages ? [...pages.filter(p => p.secondaryText === 'Maintenence' && p.cardText !== 'Shift')]: []}
                logo='admin'
                title='Admin Panel'
              /> */}
            </List>
            <Divider style={{ background: '#555' }} />
            <List>
              <ListItem button>
                <ListItemIcon><PowerSettingsNew style={{ color: '#448AFF' }} /></ListItemIcon>
                <ListItemText disableTypography primary={<Typography variant="button">Log Out</Typography>} />
              </ListItem>
            </List>
          </div>
        </Drawer>
  );
};

export default AppDrawer;