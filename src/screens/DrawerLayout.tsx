import {
  ArrowDropDown,
  Logout,
  Menu as MenuIcon,
  Person,
} from "@mui/icons-material";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Avatar,
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { PageDrawer } from "../components";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

const DRAWER_WIDTH = 240;

interface Props {
  title?: string;
  children: ReactNode;
}

function DrawerLayout({ title, children }: Props) {
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToProfile = () => {
    handleClose();
    navigate("/profile");
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { lg: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Stack direction="row" justifyContent="space-between" width="100%">
            {title && (
              <Typography variant="h6" noWrap component="div">
                {title}
              </Typography>
            )}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ width: "28px", height: "28px" }} />
              <IconButton
                size="small"
                aria-controls={menuOpen ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? "true" : undefined}
                onClick={handleClick}
              >
                <ArrowDropDown />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={menuOpen}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{ width: 320, maxWidth: "100%" }}
              >
                <MenuList disablePadding>
                  <MenuItem
                    sx={{ width: "128px", fontSize: "small" }}
                    onClick={handleToProfile}
                    divider
                  >
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </MenuItem>
                  <MenuItem
                    sx={{ width: "128px", fontSize: "small" }}
                    onClick={handleLogout}
                  >
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Log out" />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { lg: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
        aria-label="navigation-bar"
      >
        <PageDrawer
          onClose={handleDrawerToggle}
          open={mobileOpen}
          width={DRAWER_WIDTH}
        />
      </Box>
      <Box
        component="main"
        sx={{
          width: { xs: "100%", lg: `calc(100% - ${DRAWER_WIDTH}px)` },
          padding: {
            xs: 1,
            md: 3,
          },
          display: "flex",
          position: "relative",
          flexDirection: "column",
        }}
        aria-label="main-body"
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default DrawerLayout;
