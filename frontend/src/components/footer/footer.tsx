import { Box, Container, Paper, Typography } from "@mui/material";

export function Footer() {
  return (
    <Paper
      sx={{
        width: "100%",
        position: "absolute",
        bottom: 0,
        backgroundColor: "floralwhite",
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my: 1,
          }}
        >
          <Typography variant="caption" color="initial">
            A demo project using IOT Core, Kinesis and ROS2 telemetry. Copyright
            © {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}
