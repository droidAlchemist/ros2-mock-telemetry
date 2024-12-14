import ReactPlayer from "react-player";
import { useKinesisHlsVideo } from "@/hooks";
import { Box, Typography } from "@mui/material";

const { VITE_AWS_KINESES_HLS_STREAM_NAME } = import.meta.env;

export function KinesisHls() {
  const hls = useKinesisHlsVideo(VITE_AWS_KINESES_HLS_STREAM_NAME);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Typography variant="h6">Kinesis Video Stream - HLS</Typography>
      <ReactPlayer
        controls
        playing={!!hls?.url}
        playsinline={true}
        muted={true}
        url={hls?.url}
      />
    </Box>
  );
}

export default KinesisHls;
