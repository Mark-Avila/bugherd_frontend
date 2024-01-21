import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {
  AccountCircle,
  AssignmentInd,
  ConfirmationNumber,
  DarkMode,
  Dashboard,
  LightMode,
  ListAlt,
  Logout,
  Menu,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

interface IDrawerItem {
  text: string;
  icon: JSX.Element;
  onClick: VoidFunction;
}

function DrawerItem({ text, icon, onClick }: IDrawerItem) {
  return (
    <ListItem key={text} disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            fontSize: 14,
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

interface IDrawerBody {
  items: IDrawerItem[];
}

/**
 * Drawer body or content component
 */
function DrawerBody({ items }: IDrawerBody) {
  const { toggle, mode } = useContext(ColorModeContext);

  const dispatch = useDispatch();

  const handleLogOut = () => dispatch(logout());

  return (
    <>
      <Toolbar
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
      />
      <Divider />
      <Box sx={{ padding: "1em" }}>
        <Typography fontWeight="bold" fontFamily="montserrat" fontSize="1.2rem">
          Bugherd
        </Typography>
      </Box>
      <Divider />
      <List>
        {items.map((item, index) => (
          <DrawerItem
            key={index}
            text={item.text}
            icon={item.icon}
            onClick={item.onClick}
          />
        ))}
      </List>
      <Divider />
      <List>
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
        <DrawerItem text="Sign out" icon={<Logout />} onClick={handleLogOut} />
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

  const NavItems: IDrawerItem[] = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      onClick: () => handleOnItemClick("/dashboard"),
    },
    {
      text: "Profile",
      icon: <AccountCircle />,
      onClick: () => handleOnItemClick("/profile"),
    },
    // {
    //   text: "Project Users",
    //   icon: <GroupAdd />,
    //   onClick: () => handleOnItemClick("/dashboard"),
    // },
    {
      text: "My Projects",
      icon: <Menu />,
      onClick: () => handleOnItemClick("/projects"),
    },
    {
      text: "My Tickets",
      icon: <ConfirmationNumber />,
      onClick: () => handleOnItemClick("/tickets"),
    },
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
        <DrawerBody items={NavItems} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: width,
          },
        }}
        open
      >
        <DrawerBody items={NavItems} />
      </Drawer>
    </>
  );
}

export default PageDrawer;
