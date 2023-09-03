import {
  Box,
  LinearProgress,
  Typography,
  LinearProgressProps,
} from "@mui/material";

function PasswordStrength(props: LinearProgressProps & { value: number }) {
  const determineStrength = (value: number): string => {
    if (value >= 75) {
      return "Strong";
    }
    if (value >= 50) {
      return "Moderate";
    }
    if (value >= 25) {
      return "Weak";
    }

    return "Very Weak";
  };

  const determineColor = (value: number) => {
    if (value >= 75) {
      return "success";
    }
    if (value >= 50) {
      return "primary";
    }
    if (value >= 25) {
      return "warning";
    }

    return "inherit";
  };

  const color = determineColor(props.value);
  const strength = determineStrength(props.value);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={props.value}
          color={color}
        />
      </Box>
      <Box sx={{ minWidth: 80 }}>
        <Typography variant="body2" textAlign="right" color="text.secondary">
          {strength}
        </Typography>
      </Box>
    </Box>
  );
}

export default PasswordStrength;
