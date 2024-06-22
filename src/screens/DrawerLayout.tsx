import {
  AppBar,
  Avatar,
  Badge,
  Box,
  CssBaseline,
  IconButton,
  Paper,
  Popover,
  Stack,
  Toolbar,
} from "@mui/material";
import { NotifList, PageBreadcrumbs, PageDrawer } from "../components";
import { ReactNode, useEffect, useState } from "react";
import { Menu, Notifications } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  useLazyGetNotificationsOfUserQuery,
  useReadNotificationMutation,
} from "../api/notifApiSlice";

const DRAWER_WIDTH = 240;

interface Props {
  children: ReactNode;
}

function DrawerLayout({ children }: Props) {
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const auth = useSelector((root: RootState) => root.auth);
  const [getNotifications, notifs] = useLazyGetNotificationsOfUserQuery();
  const [readNotification] = useReadNotificationMutation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { breadcrumbs } = useSelector((root: RootState) => root.breadcrumbs);
  const [notifAnchor, setNotifAnchor] = useState<HTMLButtonElement | null>(
    null
  );

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

  const handleReadNotif = async (notif_id: number) => {
    if (auth.user) {
      await readNotification(notif_id);
      await getNotifications(auth.user.id!.toString());

      if (notifs.data?.data.length === 0) {
        handleNotifClose();
      }
    }
  };

  const notifOpen = Boolean(notifAnchor);
  const notifId = notifOpen ? "notif-popover " : undefined;
  const notifsOkay =
    notifs && notifs.isSuccess && !notifs.isLoading && !notifs.isFetching;

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
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
              <IconButton aria-describedby={notifId} onClick={handleNotifClick}>
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
              <IconButton>
                <Avatar sx={{ width: "24px", height: "24px" }} />
              </IconButton>
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
