import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Input from "@material-ui/core/Input";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';

export default function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <ListItem button key='Add Friend' onClick={handleClickOpen("paper")}>
        <ListItemText primary='Add Friend' />
        <ListItemIcon><AddIcon style={{marginLeft: "28px"}}/></ListItemIcon>
      </ListItem>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
        // maxWidth="sm"
        style={{ maxWidth: "500px", margin: "auto" }}
      >
        <DialogTitle id="scroll-dialog-title" style={{ textAlign: "center" }}>
          Add Friend
          <br />
          <Input
            placeholder="Enter you friend's real name, email, or username"
            inputProps={{ "aria-label": "description" }}
            fullWidth
            autoComplete="off"
            autoFocus
          />
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            padding="0 10px"
          >
            <List>
              {[
                "Real Name",
                "Real Name",
                "Real Name",
                "Real Name",
                "Real Name",
                "Real Name",
                "Real Name",
                "Real Name",
                "Real Name",
                "Real Name",
                "Real Name",
                "Real Name",
                "Real Name",
                "Real Name",
              ].map((text, index) => (
                <>
                  <ListItem button key={text}>
                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                    <ListItemText primary={text} secondary="@username" />
                    <ListItemIcon><FaceIcon style={{marginLeft: "28px"}}/></ListItemIcon>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}