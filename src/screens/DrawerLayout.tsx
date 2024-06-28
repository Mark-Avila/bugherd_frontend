import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  colors,
  CssBaseline,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
  Stack,
  Toolbar,
  useTheme,
} from "@mui/material";
import {
  ConfirmDialog,
  NotifList,
  PageBreadcrumbs,
  PageDrawer,
} from "../components";
import { ReactNode, useContext, useEffect, useState } from "react";
import {
  AccountCircle,
  Logout,
  Menu,
  Notifications,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  useLazyGetNotificationsOfUserQuery,
  useReadNotificationMutation,
} from "../api/notifApiSlice";
import { ColorModeContext } from "../App";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";

const DRAWER_WIDTH = 240;

interface Props {
  children: ReactNode;
}

function DrawerLayout({ children }: Props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const auth = useSelector((root: RootState) => root.auth);
  const [getNotifications, notifs] = useLazyGetNotificationsOfUserQuery();
  const [readNotification] = useReadNotificationMutation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { breadcrumbs } = useSelector((root: RootState) => root.breadcrumbs);

  const [notifAnchor, setNotifAnchor] = useState<HTMLButtonElement | null>(
    null
  );
  const [profileAnchor, setProfileAnchor] = useState<HTMLButtonElement | null>(
    null
  );
  const { mode } = useContext(ColorModeContext);
  const [logoutDialog, setLogoutDialog] = useState(false);

  useEffect(() => {
    if (auth.user) {
      getNotifications(auth.user.id!.toString(), true);
    }
  }, []);

  const handleNotifClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNotifAnchor(event.currentTarget);
  };

  const handleNotifClose = () => {
    setNotifAnchor(null);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  const handleReadNotif = async (notif_id: number) => {
    if (auth.user) {
      await readNotification(notif_id);
      await getNotifications(auth.user.id!.toString());

      if (notifs.data?.data.length === 0) {
        handleNotifClose();
      }
    }
  };

  const dispatch = useDispatch();

  const handleLogOut = () => dispatch(logout());

  const openLogout = () => setLogoutDialog(true);

  const closeLogout = () => setLogoutDialog(false);

  const handleProfile = () => navigate("/profile");

  const profileOpen = Boolean(profileAnchor);
  const profileId = profileOpen ? "notif-popover " : undefined;

  const notifOpen = Boolean(notifAnchor);
  const notifId = notifOpen ? "notif-popover " : undefined;

  const notifsOkay =
    notifs && notifs.isSuccess && !notifs.isLoading && !notifs.isFetching;

  return (
    <>
      <ConfirmDialog
        open={logoutDialog}
        title="Log out"
        descr="Are you sure you want to log out of your account?"
        onClose={closeLogout}
        onNo={closeLogout}
        onYes={handleLogOut}
      />
      <Box sx={{ display: "flex", width: "100%" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
            ml: { sm: `${DRAWER_WIDTH}px` },
            boxShadow: "none",
            borderBottom:
              "1px solid " +
              (mode === "light" ? colors.blueGrey[100] : colors.grey[900]),
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <Menu />
            </IconButton>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <PageBreadcrumbs items={breadcrumbs} />
              <Stack direction="row" gap={3}>
                <IconButton
                  aria-describedby={notifId}
                  onClick={handleNotifClick}
                >
                  <Badge
                    badgeContent={notifs.data ? notifs.data.data.length : 0}
                    color="primary"
                  >
                    <Notifications sx={{ width: "24px", height: "24px" }} />
                  </Badge>
                </IconButton>
                <Popover
                  id={notifId}
                  open={notifOpen}
                  anchorEl={notifAnchor}
                  onClose={handleNotifClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Box width={400}>
                    <Paper variant="outlined">
                      {notifsOkay && (
                        <NotifList
                          notifs={notifs.data.data}
                          handleCloseNotif={handleNotifClose}
                          handleReadNotif={handleReadNotif}
                        />
                      )}
                    </Paper>
                  </Box>
                </Popover>
                <IconButton
                  aria-describedby={profileId}
                  onClick={handleProfileClick}
                >
                  <Avatar sx={{ width: "24px", height: "24px" }} />
                </IconButton>
                <Popover
                  id={profileId}
                  open={profileOpen}
                  anchorEl={profileAnchor}
                  onClose={handleProfileClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Paper variant="outlined" sx={{ width: "200px" }}>
                    <List disablePadding>
                      <ListItemButton
                        divider
                        sx={{ py: 0.7 }}
                        onClick={handleProfile}
                      >
                        <ListItemIcon>
                          <AccountCircle />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ fontSize: 14 }}>
                          Profile
                        </ListItemText>
                      </ListItemButton>
                      <ListItemButton
                        divider
                        sx={{ py: 0.7 }}
                        onClick={openLogout}
                      >
                        <ListItemIcon>
                          <Logout />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ fontSize: 14 }}>
                          Sign out
                        </ListItemText>
                      </ListItemButton>
                    </List>
                  </Paper>
                </Popover>
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
    </>
  );
}

export default DrawerLayout;
