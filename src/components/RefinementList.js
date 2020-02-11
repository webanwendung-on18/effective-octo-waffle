import React from "react";
import { Highlight, connectRefinementList } from "react-instantsearch-dom";
import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
  List,
  ShoppingCartIcon,
  Badge
} from "@material-ui/core";
import { StyledBadge } from "../materialUI/styles";

const RefinementList = ({
  attribute,
  refine,
  createURL,
  currentRefinement,
  items,
  searchForItems,
  isFromSearch,
  title
}) => {
  return (
    <>
      <Typography variant="h6" className="ml-3 pt-2">
        {title}
      </Typography>
      <List>
        {items.map(item => {
          const labelId = `checkbox-list-label-${item}`;
          return (
            <ListItem
              key={item}
              role={undefined}
              dense
              button
              onClick={() => {
                refine(item.value);
              }}
            >
              <ListItemIcon>
                <Checkbox
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
