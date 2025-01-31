import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconHome from '@mui/icons-material/Home';
import {BrowserRouter, useNavigate} from 'react-router-dom';
import Router from './Router';

const drawerWidth = 280;
const didable_permanent = window.innerWidth < 640;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })
  (({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(didable_permanent ? 1 : 3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: didable_permanent ? 0 : `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    ...(didable_permanent && {width: '100%'}),
  }));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingRight: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Space = styled('div')(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Root = styled('div')(() => ({display: 'flex'}));

function PersistentDrawerLeft({menu_open, ...props}) {
  const theme = useTheme();
  const {handleIfaceState} = props;

  const handleDrawerOpen = () => {
    handleIfaceState({name: 'menu_open', value: true});
  };

  const handleDrawerClose = () => {
    handleIfaceState({name: 'menu_open', value: false});
  };

  const sx_color = {
    backgroundColor: theme.palette.primary[50],
    color: theme.palette.primary.dark,
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%)',
  };

  const navigate = useNavigate();
  const handleNavigate = (url) => {
    navigate(url);
  };
  props.handlers.handleNavigate = handleNavigate;

  return (
    <Root>
      <CssBaseline />
      <AppBar position="fixed" open={menu_open} sx={sx_color} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(menu_open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant={didable_permanent ? "temporary" : "persistent"}
        anchor="left"
        open={menu_open}
      >
        <DrawerHeader sx={sx_color}>
          <ListItem sx={{flex: 1}} disablePadding onClick={() => navigate('/')}>
            <ListItemButton>
              <ListItemIcon>
                <IconHome />
              </ListItemIcon>
              <ListItemText primary="Главная" />
            </ListItemButton>
          </ListItem>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={menu_open}>
        <Space />
        <Router {...props} handleNavigate={handleNavigate}/>
      </Main>
    </Root>
  );
}

export default function AppView(props) {
  return <BrowserRouter>
    <PersistentDrawerLeft {...props} />
  </BrowserRouter>;
}
