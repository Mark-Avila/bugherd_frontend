import {
  Box,
  Card,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PieChart } from "@mui/x-charts";
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
    <Box flex={1} minHeight={220} component={Card} variant="outlined">
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
            <Stack
              width="100%"
              flex={1}
              justifyContent="center"
              alignItems="center"
            >
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
                width={320}
                height={100}
              />
            </Stack>
          )
        ) : (
          <></>
        )}
      </Stack>
    </Box>
  );
}

export default DataCard;
