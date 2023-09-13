import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {
  AccountCircle,
  DarkMode,
  Dashboard,
  FolderShared,
  LightMode,
  Logout,
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
        <ListItemText primary={text} />
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
        <DrawerItem
          text="Profile"
          icon={<AccountCircle />}
          onClick={() => {}}
        />
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
          <Switch sx={{ margin: 0 }} onChange={toggle.toggleColorMode} />
        </ListItem>
        <DrawerItem text="Sign out" icon={<Logout />} onClick={() => {}} />
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
      text: "Projects",
      icon: <FolderShared />,
      onClick: () => handleOnItemClick("/projects"),
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
