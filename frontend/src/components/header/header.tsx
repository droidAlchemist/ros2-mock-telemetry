import { Camera } from "@mui/icons-material";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

export function Header() {
  return (
    <AppBar position="sticky" color="success">
      <Container>
        <Toolbar sx={{ gap: 1, paddingX: "0 !important" }}>
          <Camera />
          <Typography variant="h6" color="inherit" noWrap>
            AWS IOT & Kinesis Demo
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
