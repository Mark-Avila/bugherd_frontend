import { Box, Card, Typography, useMediaQuery, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts";

interface PieData {
  id: number;
  value: number;
  label: string;
}

interface Props {
  title: string;
  data: PieData[];
}

/**
 * Card used to display Pie chart data
 */
function DataCard({ data, title }: Props) {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.between("xs", "lg"));

  return (
    <Box flex={1}>
      <Card variant="outlined">
        <Box sx={{ marginX: 3, marginTop: 1.5 }}>
          <Typography>{title}</Typography>
        </Box>
        {smallScreen ? (
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
        ) : (
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
            height={150}
          />
        )}
      </Card>
    </Box>
  );
}

export default DataCard;
