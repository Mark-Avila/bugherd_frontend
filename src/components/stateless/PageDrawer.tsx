import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {
  AccountTree,
  Assignment,
  AssignmentInd,
  BugReport,
  DarkMode,
  Dashboard,
  LightMode,
  ListAlt,
  Logout,
  Task,
} from "@mui/icons-material";
import {
  alpha,
  Avatar,
  Box,
  Drawer,
  Icon,
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Switch,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "./ConfirmDialog";
import { RootState } from "../../store";

interface IDrawerItem {
  text: string;
  icon: JSX.Element;
  onClick: VoidFunction;
}

function DrawerItem({ text, icon, onClick }: IDrawerItem) {
  const theme = useTheme();
  const { mode } = useContext(ColorModeContext);

  return (
    <ListItem key={text} disablePadding>
      <ListItemButton
        onClick={onClick}
        sx={{
          px: "1.5rem",
          // borderRadius: "6px",
          ":hover": {
            color: "white",
            backgroundColor: theme.palette.primary[500],
            "& .MuiListItemIcon-root": {
              color: "white",
            },
          },
          ":active": {
            backgroundColor: alpha(theme.palette.primary[500], 0.3),
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: "2.5rem" }}>{icon}</ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            fontSize: 14,
            fontWeight: "bold",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

interface IDrawerBody {
  items: IDrawerItem[];
  adminItems: IDrawerItem[];
  user: {
    name?: string;
    email?: string;
  };
  isAdmin: boolean;
  userClick: VoidFunction;
}

/**
 * Drawer body or content component
 */
function DrawerBody({
  items,
  isAdmin,
  adminItems,
  user,
  userClick,
}: IDrawerBody) {
  const { toggle, mode } = useContext(ColorModeContext);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const theme = useTheme();

  const dispatch = useDispatch();

  const handleLogOut = () => dispatch(logout());

  const openLogout = () => setLogoutDialog(true);

  const closeLogout = () => setLogoutDialog(false);

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
      <Toolbar
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
      />
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        gap={2}
        sx={{ padding: "1em", minHeight: "64px" }}
      >
        <BugReport color="primary" />
        <Typography fontWeight="bold" fontFamily="montserrat" fontSize="1.2rem">
          Bugherd
        </Typography>
      </Stack>
      <Divider />
      <nav>
        <List>
          <ListItem>
            <Stack width="100%" py={2} alignItems="center" gap={1}>
              <Avatar sx={{ width: 64, height: 64 }} />
              <Link
                fontSize={14}
                fontWeight="bold"
                component="button"
                onClick={userClick}
              >
                {user.name || "..."}
              </Link>
              <Typography
                fontSize={12}
                color={alpha(theme.palette.text.primary, 0.5)}
              >
                {user.email || "..."}
              </Typography>
            </Stack>
          </ListItem>

          <Divider sx={{ mb: 1 }} />
          {items.map((item, index) => (
            <DrawerItem
              key={index}
              text={item.text}
              icon={item.icon}
              onClick={item.onClick}
            />
          ))}
          {isAdmin && (
            <>
              <Divider />
              <ListSubheader>Administration</ListSubheader>
              {adminItems.map((item, index) => (
                <DrawerItem
                  key={index}
                  text={item.text}
                  icon={item.icon}
                  onClick={item.onClick}
                />
              ))}
            </>
          )}
        </List>
      </nav>
      <Divider sx={{ mt: 1 }} />
      <List sx={{ mt: "auto" }}>
        <ListItem>
          <ListItemIcon>
            {mode === "light" ? <LightMode /> : <DarkMode />}
          </ListItemIcon>
          <Switch
            sx={{ margin: 0 }}
            onChange={toggle.toggleColorMode}
            checked={mode === "dark"}
          />
        </ListItem>
        <DrawerItem text="Sign out" icon={<Logout />} onClick={openLogout} />
      </List>
    </>
  );
}

interface Props {
  open: boolean;
  onClose: VoidFunction;
  width: number;
}

/**
 * Drawer or sidebar UI component
 */
function PageDrawer({ open, onClose, width }: Props) {
  const navigate = useNavigate();
  const handleOnItemClick = (to: string) => {
    navigate(to);
  };
  const theme = useTheme();
  const { user } = useSelector((state: RootState) => state.auth);

  const NavItems: IDrawerItem[] = [
    {
      text: "Dashboard",
      icon: <Dashboard fontSize="small" />,
      onClick: () => handleOnItemClick("/dashboard"),
    },
    {
      text: "Tickets",
      icon: <Assignment fontSize="small" />,
      onClick: () => handleOnItemClick("/dashboard"),
    },
    {
      text: "Projects",
      icon: <AccountTree fontSize="small" />,
      onClick: () => handleOnItemClick("/dashboard"),
    },
  ];

  const AdminNavItems: IDrawerItem[] = [
    {
      text: "Manage Users",
      icon: <AssignmentInd />,
      onClick: () => handleOnItemClick("/manage/users"),
    },
    {
      text: "Manage Projects",
      icon: <ListAlt />,
      onClick: () => handleOnItemClick("/manage/projects"),
    },
  ];

  return (
    <>
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: width,
          },
        }}
      >
        <DrawerBody
          items={NavItems}
          isAdmin={user?.role === 2}
          adminItems={AdminNavItems}
          userClick={() => handleOnItemClick("/profile")}
          user={{ name: user?.fname, email: user?.email }}
        />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: width,
            backgroundColor: theme.palette.background.default,
          },
        }}
        open
      >
        <DrawerBody
          items={NavItems}
          isAdmin={user?.role === 2}
          adminItems={AdminNavItems}
          userClick={() => handleOnItemClick("/profile")}
          user={{ name: user?.fname, email: user?.email }}
        />
      </Drawer>
    </>
  );
}

export default PageDrawer;
