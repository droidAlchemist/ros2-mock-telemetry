export enum IOT_ROS2_TOPICS {
  "TELEMETRY" = "ros2_mock_telemetry_topic",
  "CONTROL1" = "cmd_vel",
}
export enum VIDEO_STREAM_TYPES {
  "HLS" = "hls",
  "WEBRTC" = "webrtc",
}
export type DIRECTION_TYPES = "FORWARD" | "RIGHT" | "LEFT" | "BACKWARD";
export type MOVEMENT_TYPES = "move" | "stop" | "start";
export const ROBOT_CONTROL_MULTIPLIER = 11;
