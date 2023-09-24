import { Stack, Grid, TextField } from "@mui/material";
import { SelectItems } from "..";
import { ticketSelects } from "../../utils";
import { FormikProps } from "formik";
import { FormikNewTicket } from "../../types";

interface Props {
  formik: FormikProps<FormikNewTicket>;
}

function NewTicketSelects({ formik }: Props) {
  return (
    <Stack direction="column" height="100%" justifyContent="space-between">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SelectItems
            items={ticketSelects.types}
            id="select-type"
            label="Type"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            error={formik.touched.type && Boolean(formik.errors.type)}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectItems
            items={ticketSelects.status}
            id="select-status"
            label="Status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            error={formik.touched.status && Boolean(formik.errors.status)}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectItems
            items={ticketSelects.priority}
            id="select-priority"
            label="Priority"
            name="priority"
            value={formik.values.priority}
            onChange={formik.handleChange}
            error={formik.touched.priority && Boolean(formik.errors.priority)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="select-estimate"
            label="Time Estimate (Hours)"
            type="number"
            size="small"
            name="hours"
            value={formik.values.hours}
            onChange={formik.handleChange}
            error={formik.touched.hours && Boolean(formik.errors.hours)}
            fullWidth
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default NewTicketSelects;
