import { Box } from "@mui/material";
import { Telemetry } from "./telemetry/telemetry";
import RobotController from "./robot-controller/robot-controller";
import { useAwsCredentials, useAwsIotMqtt } from "@/hooks";

export function IotCoreContainer() {
  const credentials = useAwsCredentials();
  const connection = useAwsIotMqtt(credentials);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 6 }}>
      {/* Show Telemtry data using IOT Core from ROS2 */}
      <Telemetry connection={connection} />
      {/* Control robot by sending x,z pos using IOT Core to ROS2 */}
      <RobotController connection={connection} />
    </Box>
  );
}
