import { Box } from "@mui/material";
import KinesisHls from "./kinesis-hls";

export function VideoStreaming() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 2,
      }}
    >
      <KinesisHls />
    </Box>
  );
}
