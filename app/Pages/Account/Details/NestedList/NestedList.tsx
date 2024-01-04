import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import type { FC } from "react";
import { useState } from "react";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import type { DetailsProps } from "../Details";

const NestedList: FC<DetailsProps> = ({ customer }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List>
      <ListItemButton divider={true} onClick={handleClick}>
        <ListItemText primary="Change password" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open}>
        <List component="div" disablePadding>
          <ChangePasswordForm email={customer.email} />
        </List>
      </Collapse>
    </List>
  );
};
export default NestedList;
