import {
  type PropsWithChildren,
  type FC,
} from "react";

import "./ButtonGroup.css";

export const ButtonGroup: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="button-group">
      {children}
    </div>
  );
};