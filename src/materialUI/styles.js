import { styled, withStyles } from "@material-ui/core/styles";
import { Button, TextField, Paper, Badge } from "@material-ui/core/";

export const BtnLight = styled(Button)({
  color: "#ffffff",
  borderColor: "#ffffff"
});

export const TFPrimary = styled(TextField)({
  "& label.Mui-focused": {
    color: "#343a40"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#343a40"
  }
});

// https://material-ui.com/customization/components/#global-css-override
export const GlobalCss = withStyles({
  "@global": {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    ".MuiButton-root": {
      color: "#444"
    }
  }
})(() => null);

export const RefinementPaper = withStyles({
  root: {
    backgroundColor: "#eee"
  }
})(Paper);

export const StyledBadge = withStyles(theme => ({
  badge: {
    padding: "10px"
  }
}))(Badge);
