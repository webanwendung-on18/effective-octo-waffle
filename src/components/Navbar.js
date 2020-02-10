import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu
} from "@material-ui/core/";
import { FiMenu, FiSearch, FiUser, FiPlusCircle, FiLogOut, FiLogIn } from "react-icons/fi";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

export default function PrimarySearchAppBar(props) {
  const { user, logOutUser } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user && (
        <>
          <Link to="/add-recipe" className="text-dark nounderline">
            <MenuItem>
              <IconButton>
                <FiPlusCircle />
              </IconButton>
              <p className="mt-3">Add recipe</p>
            </MenuItem>
          </Link>
          <Link to={`/profile/${props.user.uid}`} className="text-dark nounderline">
            <MenuItem>
              <IconButton>
                <FiUser />
              </IconButton>
              <p className="mt-3">Profile</p>
            </MenuItem>
          </Link>
          <Link to="/" onClick={e => logOutUser(e)} className="text-dark nounderline">
            <MenuItem>
              <IconButton>
                <FiLogOut />
              </IconButton>
              <p className="mt-3">Logout</p>
            </MenuItem>
          </Link>
        </>
      )}
      {!user && (
        <>
          <Link to="/login" className="text-dark nounderline">
            <MenuItem>
              <IconButton>
                <FiLogIn />
              </IconButton>
              <p className="mt-3">Log in</p>
            </MenuItem>
          </Link>
        </>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <Link to="/recipes" className="text-dark nounderline">
            <Typography className={classes.title} variant="h6" noWrap>
              Octo Waffle
            </Typography>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <FiSearch />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          {user && (
            <div className={classes.sectionDesktop}>
              <Link to="/add-recipe">
                <IconButton>
                  <FiPlusCircle />
                </IconButton>
              </Link>
              <Link to={`/profile/${props.user.uid}`}>
                <IconButton>
                  <FiUser />
                </IconButton>
              </Link>
              <Link to="/" onClick={e => logOutUser(e)}>
                <IconButton>
                  <FiLogOut />
                </IconButton>
              </Link>
            </div>
          )}
          {!user && (
            <div className={classes.sectionDesktop}>
              <Link to="/login">
                <IconButton>
                  <FiLogIn />
                </IconButton>
              </Link>
            </div>
          )}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <FiMenu />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {renderMobileMenu}
    </div>
  );
}
