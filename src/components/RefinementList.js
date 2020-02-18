import React from "react";
import { connectRefinementList } from "react-instantsearch-dom";
import { StyledBadge } from "../materialUI/styles";
import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  List
} from "@material-ui/core";

const RefinementList = ({ refine, items, title }) => {
  return (
    <>
      <Typography variant="h6" className="ml-3 pt-2">
        {title}
      </Typography>
      <List>
        {items.map((item, index) => {
          const labelId = `checkbox-list-label-${item}`;
          return (
            <ListItem
              key={index}
              role={undefined}
              dense
              button
              onClick={() => {
                refine(item.value);
              }}
            >
              <ListItemIcon>
                <Checkbox
                  key={index}
                  color="primary"
                  edge="start"
                  checked={item.isRefined}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.label} />
              <ListItemSecondaryAction>
                <IconButton aria-label="count" disabled>
                  <StyledBadge badgeContent={item.count} color="primary" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export const CustomRefinementList = connectRefinementList(RefinementList);
