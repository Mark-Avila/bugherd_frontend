import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  List,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { PageDrawer, TeamListItem } from "../components";
import { useState } from "react";
import { grey } from "@mui/material/colors";

const DRAWER_WIDTH = 240;

function Projects() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const theme = useTheme();

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
            <Menu />
          </IconButton>
          <Typography variant="h6">Projects</Typography>
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
          flexDirection: "column",
        }}
        aria-label="main-body"
      >
        <Toolbar />
        <Box component="header" display="flex" justifyContent="space-between">
          <Box sx={{ width: "100%" }}>
            <Typography variant="h6">Kikoo weather services</Typography>
            <Typography fontSize={12} color={grey[600]}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Necessitatibus non, excepturi, eius vel rerum odio cupiditate ut
              molestias distinctio optio, consequuntur similique ducimus. Libero
              magnam cumque necessitatibus labore est. Architecto?
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ marginY: 4 }} />

        <Grid container spacing={2}>
          <Grid item lg={4}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginBottom={2}
            >
              <Typography variant="h6">Team</Typography>
              <Button sx={{ marginRight: 2 }} variant="contained" size="small">
                Add member
              </Button>
            </Box>
            <Paper variant="outlined">
              <List>
                <TeamListItem name="Mark Avila" />
                <Divider />
                <TeamListItem name="Harvey Alonday" />
                <Divider />
                <TeamListItem name="John Remmon Castor" />
                <Divider />
                <TeamListItem name="Neilmathew Lacsamana" />
              </List>
            </Paper>
          </Grid>
          <Grid item lg={8}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginBottom={2}
            >
              <Typography variant="h6">Tickets</Typography>
              <Button variant="contained" size="small">
                New ticket
              </Button>
            </Box>
            <TableContainer variant="outlined" component={Paper}>
              <Table
                sx={{
                  width: "100%",
                  "& .MuiTableRow-root:hover": {
                    backgroundColor: theme.palette.action.hover,
                    cursor: "pointer",
                  },
                }}
                aria-label="ticket-table"
              >
                <TableHead>
                  <TableCell size="small" width={200}>
                    Title
                  </TableCell>
                  <TableCell size="small" width={400}>
                    Description
                  </TableCell>
                  <TableCell size="small">Author</TableCell>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography fontSize={12}>Ticket title</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontSize={12}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontSize={12}>
                        Mark Christian Avila
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Projects;
