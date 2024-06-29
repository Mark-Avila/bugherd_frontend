import {
  Box,
  Card,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { PieData } from "../../types";

interface Props {
  title: string;
  data: PieData[];
}

function DataCard({ data, title }: Props) {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.between("xs", "lg"));

  const hasData = data.length !== 0;

  return (
    <Box flex={1} minHeight={220}>
      <Paper
        variant="outlined"
        sx={{
          height: "100%",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Stack justifyContent="space-between" minHeight="100%">
          <Box marginX={1.5} marginTop={1.5}>
            <Typography>{title}</Typography>
          </Box>
          {!hasData && (
            <Stack justifyContent="center" alignItems="center" flex={1}>
              <Typography color="text.disabled">No data available</Typography>
            </Stack>
          )}
          {hasData ? (
            smallScreen ? (
              <Stack width="100%">
                <PieChart
                  series={[
                    {
                      data: data,
                      innerRadius: 15,
                      outerRadius: 50,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      startAngle: -90,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: { innerRadius: 30 },
                    },
                  ]}
                  width={300}
                  height={150}
                />
              </Stack>
            ) : (
              <Stack flex={1} alignItems="center">
                <PieChart
                  series={[
                    {
                      data: data,
                      innerRadius: 15,
                      outerRadius: 50,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      startAngle: -90,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: { innerRadius: 30 },
                    },
                  ]}
                  slotProps={{
                    legend: {
                      labelStyle: {
                        fontSize: 12,
                      },
                      markGap: 12,
                      position: { vertical: "middle", horizontal: "right" },
                    },
                  }}
                  padding={{ left: 0, right: 120, top: 0 }}
                  width={270}
                />
              </Stack>
            )
          ) : (
            <></>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

export default DataCard;
