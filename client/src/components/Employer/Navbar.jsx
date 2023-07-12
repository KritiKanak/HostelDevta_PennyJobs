import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import '../navbar.css'

const useStyles = makeStyles((theme) => ({
  navbar: {
    marginBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawer: {
    width: 240,
  },
}));

function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/employer');
  };

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link className='logo' to="/">Aamdani</Link>
        </Typography>
        {isMobile ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton} onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
              <List className={classes.drawer}>
                <ListItem button component={Link} to="/" selected={location.pathname === '/'}>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/about" selected={location.pathname === '/about'}>
                  <ListItemText primary="About" />
                </ListItem>
                {!localStorage.getItem('token') ? (
                  <>
                    <ListItem button component={Link} to="/employer" selected={location.pathname === '/employer'}>
                      <ListItemText primary="Login" />
                    </ListItem>
                    <ListItem button component={Link} to="/employer" selected={location.pathname === '/employer'}>
                      <ListItemText primary="SignUp" />
                    </ListItem>
                  </>
                ) : (
                  <ListItem button onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                  </ListItem>
                )}
              </List>
            </Drawer>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/about" className={location.pathname === '/about' ? 'active' : ''}>
              About
            </Button>
            {!localStorage.getItem('token') ? (
              <>
                <Button color="inherit" component={Link} to="/employer" className={location.pathname === '/employer' ? 'active' : ''}>
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/employer" className={location.pathname === '/employer' ? 'active' : ''}>
                  SignUp
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
