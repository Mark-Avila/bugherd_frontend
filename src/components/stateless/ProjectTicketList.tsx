import {
  Button,
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
import PageSection from "./PageSection";

function ProjectTicketList() {
  const theme = useTheme();

  return (
    <PageSection
      title="Team"
      action={
        <Button variant="contained" size="small">
          New ticket
        </Button>
      }
    >
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
                <Typography fontSize={12}>Mark Christian Avila</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </PageSection>
  );
}

export default ProjectTicketList;
