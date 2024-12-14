import {
  IotVelocityMessageType,
  JoystickUpdateEventType,
  ROBOT_CONTROL_MULTIPLIER,
} from "@/types";

export const calculateVelocity = (value: number) => {
  return value * ROBOT_CONTROL_MULTIPLIER;
};

/* 
  ROS2 Commands: forward  --> x   backward --> -x   left --> z    right -> -z
  For Joystick control convert y --> linear x and x --> angular z  
*/
export const getCommandVelocity = (d: JoystickUpdateEventType) => {
  let cmd: IotVelocityMessageType = {
    linear: {
      x: 0,
      y: 0,
      z: 0,
    },
    angular: {
      x: 0,
      y: 0,
      z: 0,
    },
  };
  if (d.type === "move") {
    cmd.linear.x = calculateVelocity(d.y);
    cmd.angular.z = d.x;
    return cmd;
  }
  return undefined;
};
