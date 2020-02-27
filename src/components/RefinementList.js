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
    <div className="RefinementList">
      <Typography variant="h6" className="ml-4 mb-2">
        {title}
      </Typography>
      <List className="mb-4">
        {items.map((item, index) => {
          const labelId = `checkbox-list-label-${item}`;
          return (
            <div className="ListItem" key={index}>
              <ListItem
                role={undefined}
                dense
                onClick={() => {
                  refine(item.value);
                }}
                className="mb-2"
              >
                <ListItemIcon>
                  <Checkbox
                    key={index}
                    color="primary"
                    edge="start"
                    checked={item.isRefined}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                    className="ml-3"
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={item.label} />
                <ListItemSecondaryAction>
                  <IconButton aria-label="count" disabled>
                    <StyledBadge badgeContent={item.count} color="secondary" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </div>
          );
        })}
      </List>
    </div>
  );
};

export const CustomRefinementList = connectRefinementList(RefinementList);
