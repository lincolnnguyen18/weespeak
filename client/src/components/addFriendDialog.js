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
import Icon from '@material-ui/core/Icon';

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

  // // For testing
  // React.useEffect(() => {
  //   console.log(svgs)
  // }, []);

  return (
    <div>
      <ListItem button key='Find a Friend' onClick={handleClickOpen("paper")}>
        <ListItemText primary='Find a Friend' />
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
          Find a Friend
          <br />
          <Input
            // placeholder="Separate search terms with commas"
            placeholder="Enter your friend's username here"
            inputProps={{ "aria-label": "description" }}
            fullWidth
            autoComplete="off"
            autoFocus
          />
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            // id="scroll-dialog-description"
            // ref={descriptionElementRef}
            // padding="0 10px"
          >
            <List>
              {[
                "Username1",
                "Username2",
                "Username3",
                "Username4",
                "Username5",
                "Username6",
                "Username7",
                "Username8",
                "Username9",
                "Username10",
                "Username11",
                "Username12",
                "Username13",
                "Username14",
                "Username15",
                "Username16",
                "Username17",
                "Username18",
                "Username19",
                "Username20",
                "Username21",
                "Username22",
                "Username23",
                "Username24",
                "Username25",
                "Username26",
                "Username27",
                "Username28",
                "Username29",
                "Username30",
              ].map((text, index) => (
                <>
                  <ListItem button key={index}>
                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                    <ListItemText
                      primary={text}
                      // secondary={
                      //   <div>
                      //     {/* <div>Native language(s): English, Vietnamese</div>
                      //     <div>Language(s) of interest: Japanese</div> */}
                      //     <div>Status: Male, College Student, 21 years old</div>
                      //     <div>Hobbies: Cooking, Running, Reading light novels, Studying, Progamming.</div>
                      //   </div>
                      // }
                    />
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