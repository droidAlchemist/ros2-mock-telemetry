import { Container, Box } from "@mui/material";
import { IotCoreContainer, VideoStreaming } from "@/components";

const Home = () => {
  return (
    <Container sx={{ position: "relative" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Show IOT core implementations */}
        <IotCoreContainer />
        {/* Show video data using kinesis from ROS2 */}
        <VideoStreaming />
      </Box>
    </Container>
  );
};

export default Home;
