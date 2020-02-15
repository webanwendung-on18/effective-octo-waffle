import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import Rating from "@material-ui/lab/Rating";
import Favorite from "@material-ui/icons/Favorite";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import { useLabelIconStyles } from "@mui-treasury/styles/icon/label";
import { useRowFlexStyles } from "@mui-treasury/styles/flex/row";
import Moment from "react-moment";

const useStyles = makeStyles(({ spacing, palette }) => ({
  card: {
    display: "flex",
    padding: spacing(2),
    borderRadius: 4,
    margin: "1rem 0"
  },
  media: {
    minWidth: "25%",
    maxWidth: "25%",
    flexShrink: 0,
    backgroundColor: palette.grey[200],
    borderRadius: 4,
    marginRight: "2rem",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
    // boxShadow: "0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9"
  },
  rating: {
    verticalAlign: "text-top"
  },
  content: {
    padding: `${spacing(0, 2, 0, 0)} !important`
  },
  heading: {
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: "0.5px",
    marginBottom: 0,
    marginRight: spacing(1.5),
    display: "inline-block"
  },
  body: {
    fontSize: 14,
    color: palette.grey[500],
    wordBreak: "break-all",
    marginBottom: "2rem"
  },
  divider: {
    // margin: spacing(1, 0)
    marginTop: "10px"
  },
  textFooter: {
    fontSize: 14
  },
  icon: {
    fontSize: "1.2rem",
    verticalAlign: "bottom"
  }
}));

const Comment = ({
  username,
  message,
  messageId,
  profileImage,
  date,
  handleDelete,
  commentUserId,
  registeredUserId
}) => {
  const styles = useStyles();
  const gutterStyles = usePushingGutterStyles({ space: 1.5 });
  const labelStyles = useLabelIconStyles({ linked: true });
  const flexStyles = useRowFlexStyles();
  return (
    <Card className={styles.card} variant="outlined">
      <CardMedia className={styles.media} image={profileImage} />
      <CardContent className={styles.content}>
        <Box mb={1}>
          <h3 className={styles.heading}>{username}</h3>
          <Rating
            name={"rating"}
            value={Math.floor(Math.random() * 6)}
            className={styles.rating}
            size={"small"}
          />
        </Box>
        <p className={styles.body}>{message}</p>
        <Divider className={styles.divider} light />
        <div className={flexStyles.parent}>
          <Moment className={styles.textFooter} fromNow>
            {date * 1000}
          </Moment>
          <div className={cx(flexStyles.rightChild, flexStyles.parent, gutterStyles.parent)}>
            {commentUserId === registeredUserId && (
              <button
                type={"button"}
                className={labelStyles.link}
                onClick={e => handleDelete(e, messageId)}
              >
                <DeleteForeverIcon className={labelStyles.icon} />
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Comment;
