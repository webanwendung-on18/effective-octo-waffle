import { styled, withStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core/";

export const BtnPrimary = styled(Button)({
  background: "linear-gradient(30deg, #69ed66 0%, #7fffce 85%)",
  border: 0,
  borderRadius: 3,
  color: "#218c74",
  height: 45,
  padding: "0 30px",
  "&:hover": {
    color: "#343a40"
  }
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
