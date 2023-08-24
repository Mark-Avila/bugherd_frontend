import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";

function ProjectTicketList() {
  const theme = useTheme();

  return (
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
          <TableRow>
            <TableCell component="th" size="small" width={200}>
              Title
            </TableCell>
            <TableCell component="th" size="small" width={400}>
              Description
            </TableCell>
            <TableCell component="th" size="small">
              Author
            </TableCell>
          </TableRow>
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
              <Typography fontSize={12}>Mark Christian Avila</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProjectTicketList;
