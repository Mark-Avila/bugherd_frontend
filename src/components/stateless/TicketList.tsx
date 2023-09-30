import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import TicketListItem from "./TicketListItem";

function TicketList() {
  return (
    <Paper variant="outlined">
      <List disablePadding>
        <TicketListItem />
        <TicketListItem />
        <TicketListItem />
        <TicketListItem />
        <TicketListItem />
        <TicketListItem />
        <TicketListItem />
        <TicketListItem />
        <TicketListItem />
        <TicketListItem />
      </List>
    </Paper>
  );

  // return (
  //   <TableContainer variant="outlined" component={Paper}>
  //     <Table
  //       sx={{
  //         width: "100%",
  //         "& .MuiTableRow-root:hover": {
  //           backgroundColor: theme.palette.action.hover,
  //           cursor: "pointer",
  //         },
  //       }}
  //       aria-label="ticket-table"
  //     >
  //       <TableHead>
  //         <TableRow>
  //           <TableCell component="th" size="small" width="10%">
  //             No.
  //           </TableCell>
  //           <TableCell component="th" size="small" width="50%">
  //             Title
  //           </TableCell>
  //           <TableCell component="th" size="small" width="20%">
  //             Assigned
  //           </TableCell>
  //           <TableCell component="th" size="small" width="20%">
  //             Status
  //           </TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         <TableRow>
  //           <TableCell>
  //             <Typography fontSize={12}>#1</Typography>
  //           </TableCell>
  //           <TableCell>
  //             <Typography fontSize={12}>Ticket title</Typography>
  //           </TableCell>
  //           <TableCell>
  //             <Typography fontSize={12}>Mark Christian Avila</Typography>
  //           </TableCell>
  //           <TableCell>
  //             <Chip label="ongoing" color="success" />
  //           </TableCell>
  //         </TableRow>
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  // );
}

export default TicketList;
