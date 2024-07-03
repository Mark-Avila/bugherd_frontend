import {
  AppBar,
  Avatar,
  Badge,
  Box,
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
  NotificationsActive,
  NotificationsNoneOutlined,
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
import pictureApi from "../api/userPictureApi";

const DRAWER_WIDTH = 240;

interface Props {
  children: ReactNode;
}

/**
 * This serves as the primary page layout for all pages for handling the
 * sidebar/drawer both in mobile and desktop.
 */
function DrawerLayout({ children }: Props) {
  // User authentication state
  const auth = useSelector((root: RootState) => root.auth);

  // User notification data fetching method and response object
  const [getNotifications, notifs] = useLazyGetNotificationsOfUserQuery();

  // Method for setting user notification as 'read'
  const [readNotification] = useReadNotificationMutation();

  // Get breadcrumbs route
  const { breadcrumbs } = useSelector((root: RootState) => root.breadcrumbs);

  // MUI Theme object
  const theme = useTheme();

  // For route navigation
  const navigate = useNavigate();

  // Toggle mobile drawer render state
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  // Notification list popover anchor
  const [notifAnchor, setNotifAnchor] = useState<HTMLButtonElement | null>(
    null
  );

  // Profile popover anchor
  const [profileAnchor, setProfileAnchor] = useState<HTMLButtonElement | null>(
    null
  );

  // Get theme mode (light or dark mode)
  const { mode } = useContext(ColorModeContext);

  // User profile picture state
  const [userPicture, setUserPicture] = useState<string | undefined>();

  // Conditional render states
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const profileOpen = Boolean(profileAnchor);
  const profileId = profileOpen ? "notif-popover " : undefined;
  const notifOpen = Boolean(notifAnchor);
  const notifId = notifOpen ? "notif-popover " : undefined;

  // Fetch user notification data
  useEffect(() => {
    if (auth.user) {
      getNotifications(auth.user.id!.toString(), true);
    }
  }, []);

  useEffect(() => {
    const fetchUserPicture = async () => {
      if (auth.user) {
        const userPictureData: string | null =
          await pictureApi.fetchUserPicture(auth.user.id!.toString());
        if (userPictureData !== null) {
          setUserPicture(userPictureData);
        }
      }
    };

    fetchUserPicture();
  }, []);

  // Method for handling when user 'reads' a notification
  const handleReadNotif = async (notif_id: number) => {
    if (auth.user) {
      // Update read status in backend
      await readNotification(notif_id);
      // Reload notification data
      await getNotifications(auth.user.id!.toString());

      // If user reads last notification, close the popover
      if (notifs.data?.data.length === 0) {
        handleNotifClose();
      }
    }
  };

  // Logout method
  const dispatch = useDispatch();
  const handleLogOut = () => dispatch(logout());

  // Other handler methods that don't need an explanation
  const openLogout = () => setLogoutDialog(true);
  const closeLogout = () => setLogoutDialog(false);
  const handleProfile = () => navigate("/profile");
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
            width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` },
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
              sx={{ mr: 2, display: { lg: "none" } }}
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
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={3}
              >
                <IconButton
                  aria-describedby={notifId}
                  onClick={handleNotifClick}
                >
                  <Badge
                    badgeContent={notifs.data ? notifs.data.data.length : 0}
                    color="primary"
                  >
                    {notifs.data && notifs.data.data.length !== 0 ? (
                      <NotificationsActive />
                    ) : (
                      <NotificationsNoneOutlined />
                    )}
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
                  <Avatar
                    sx={{ width: "36px", height: "36px" }}
                    src={userPicture}
                  />
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
            pictureSrc={userPicture}
          />
        </Box>
        <Box
          component="main"
          sx={{
            width: { xs: "100%", lg: `calc(100% - ${DRAWER_WIDTH}px)` },
            display: "flex",
            position: "relative",
            flexDirection: "column",
            minHeight: "100%",
          }}
          aria-label="main-body"
        >
          <Toolbar />
          <Box
            padding={{
              xs: 1,
              md: 3,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DrawerLayout;
