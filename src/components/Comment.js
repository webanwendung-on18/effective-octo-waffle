import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import Rating from "@material-ui/lab/Rating";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import { useLabelIconStyles } from "@mui-treasury/styles/icon/label";
import { useRowFlexStyles } from "@mui-treasury/styles/flex/row";
import Moment from "react-moment";
import { Modal, Fade, Button, TextField, InputAdornment } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles(({ spacing, palette, shadows }) => ({
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
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: palette.background.paper,
    borderRadius: 4,
    boxShadow: shadows[5],
    padding: spacing(3, 2, 2),
    width: "500px"
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
  registeredUserId,
  handleUpdate
}) => {
  const styles = useStyles();
  const gutterStyles = usePushingGutterStyles({ space: 1.5 });
  const labelStyles = useLabelIconStyles({ linked: true });
  const flexStyles = useRowFlexStyles();
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState(message);

  // const handleChange = event => setComment(event.target.value);

  const handleOpen = (e, message) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>
        {/* <button type="button" onClick={handleOpen}>
          react-transition-group
        </button> */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={styles.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <div className={styles.paper}>
              {/* <h2 id="transition-modal-title">Update Comment</h2> */}
              {/* <p id="transition-modal-description">react-transition-group animates me.</p> */}
              <TextField
                fullWidth
                variant="outlined"
                label="Update your comment"
                name="comment"
                multiline
                rowsMax="3"
                value={comment}
                onChange={e => setComment(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        onClick={e => handleUpdate(comment, messageId, handleClose)}
                        variant="contained"
                        color="primary"
                        className=""
                      >
                        {"Update"}
                      </Button>
                    </InputAdornment>
                  )
                }}
              />
            </div>
          </Fade>
        </Modal>
      </div>
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
                <>
                  <button
                    type={"button"}
                    className={labelStyles.link}
                    onClick={e => handleDelete(e, messageId)}
                  >
                    <DeleteForeverIcon className={labelStyles.icon} />
                  </button>
                  <button
                    type={"button"}
                    className={labelStyles.link}
                    onClick={e => handleOpen(e, message, messageId)}
                  >
                    <EditIcon className={labelStyles.icon} />
                  </button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comment;
