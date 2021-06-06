import React from "react";
import { DoingFlagIcon, DoneFlagIcon, TodoFlagIcon } from "../icons";

const StatusFlag = ({ status }: { status: string }) => {
  switch (status) {
    case "to do":
      return <TodoFlagIcon />;
    case "doing":
      return <DoingFlagIcon />;
    case "done":
      return <DoneFlagIcon />;
    default:
      return <TodoFlagIcon />;
  }
};

export default StatusFlag;
