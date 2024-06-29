import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {
  AccountCircle,
  AccountTree,
  Assignment,
  AssignmentInd,
  BugReport,
  DarkMode,
  Dashboard,
  LightMode,
  ListAlt,
} from "@mui/icons-material";
import {
  alpha,
  colors,
  Drawer,
  IconButton,
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

  return (
    <ListItem key={text} disablePadding>
      <ListItemButton
        onClick={onClick}
        sx={{
          px: "1.5rem",
          color: "white",
          // borderRadius: "6px",
          ":hover": {
            backgroundColor: theme.palette.primary[600],
          },
          ":active": {
            backgroundColor: alpha(theme.palette.primary[500], 0.3),
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: "2.5rem", color: "white" }}>
          {icon}
        </ListItemIcon>
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

  const closeLogout = () => setLogoutDialog(false);

  const isDarkMode = mode === "dark";

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
        <BugReport
          htmlColor={isDarkMode ? theme.palette.primary[500] : "white"}
        />
        <Typography
          color="white"
          fontWeight="bold"
          fontFamily="montserrat"
          fontSize="1.2rem"
        >
          Bugherd
        </Typography>
      </Stack>
      <Divider
        sx={{
          borderColor: isDarkMode
            ? theme.palette.grey[900]
            : theme.palette.primary[400],
        }}
      />
      <nav>
        <List>
          <ListItem>
            <Stack width="100%" py={2} alignItems="center" gap={1}>
              <IconButton onClick={userClick}>
                <AccountCircle
                  sx={{ width: 96, height: 96 }}
                  htmlColor={colors.lightBlue[200]}
                />
              </IconButton>
              <Link
                fontSize={14}
                fontWeight="bold"
                component="button"
                color={isDarkMode ? theme.palette.text.primary : "white"}
                sx={{
                  ":hover": {
                    color: colors.lightBlue[200],
                  },
                }}
                onClick={userClick}
              >
                {user.name || "..."}
              </Link>
              <Typography
                fontSize={12}
                color={isDarkMode ? colors.grey[500] : colors.grey[100]}
              >
                {user.email || "..."}
              </Typography>
            </Stack>
          </ListItem>

          <Divider
            sx={{
              mb: 1,
              borderColor: isDarkMode
                ? theme.palette.grey[900]
                : theme.palette.primary[400],
            }}
          />
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
              <Divider
                sx={{
                  my: 1,
                  borderColor: isDarkMode
                    ? theme.palette.grey[900]
                    : theme.palette.primary[400],
                }}
              />
              <ListSubheader
                sx={{
                  backgroundColor: theme.palette.primary[500],
                  color: "white",
                }}
              >
                Administration
              </ListSubheader>
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
      <Divider
        sx={{
          mt: 1,
          borderColor: isDarkMode
            ? theme.palette.grey[900]
            : theme.palette.primary[400],
        }}
      />
      <List sx={{ mt: "auto", py: 2, px: 1 }}>
        <ListItem>
          <ListItemIcon>
            {mode === "light" ? (
              <LightMode htmlColor="white" />
            ) : (
              <DarkMode htmlColor="white" />
            )}
          </ListItemIcon>
          <Switch
            sx={{
              margin: 0,
              "& .MuiSwitch-track": {
                backgroundColor: colors.blue[300],
              },
            }}
            onChange={toggle.toggleColorMode}
            checked={mode === "dark"}
          />
        </ListItem>
        {/* <DrawerItem text="Sign out" icon={<Logout />} onClick={openLogout} /> */}
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
  const { mode } = useContext(ColorModeContext);
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
      onClick: () => handleOnItemClick("/profile/tickets"),
    },
    {
      text: "Projects",
      icon: <AccountTree fontSize="small" />,
      onClick: () => handleOnItemClick("/profile/projects"),
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
            backgroundColor:
              mode === "light"
                ? theme.palette.primary[500]
                : theme.palette.background.default,
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
