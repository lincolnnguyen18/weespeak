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
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import { StylesProvider } from "@material-ui/core/styles";
import "./addFriendDialogOverride.css";

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
					<StylesProvider injectFirst>
						<Input
							// placeholder="Separate search terms with commas"
							placeholder="Enter your friend's name or username here"
							inputProps={{ "aria-label": "description" }}
							fullWidth
							autoComplete="off"
							autoFocus
							type="search"
						/>
					</StylesProvider>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            // id="scroll-dialog-description"
            // ref={descriptionElementRef}
            // padding="0 10px"
          >
            <List>
              {[
                "FJIEWOJFIOEWJFIOEWJFIOWEJ FEWIFOEWJIOFJWEIOJFIEOWJFIEWO",
                "Real name",
								"Real name",
								"Real name",
								"Real name",
								"Real name",
                "Real name",
								"Real name",
								"Real name",
								"Real name",
								"Real name",
                "Real name",
								"Real name",
								"Real name",
								"Real name",
								"Real name",
                "Real name",
								"Real name",
								"Real name",
								"Real name",
								"Real name",
                "Real name",
								"Real name",
								"Real name",
								"Real name",
								"Real name",
                "Real name",
								"Real name",
								"Real name",
								"Real name",
								"Real name",
                "Real name",
								"Real name",
								"Real name",
								"Real name",
								"Real name",
                "Real name",
								"Real name",
								"Real name",
								"Real name",
              ].map((text, index) => (
                <>
                  <ListItem button key={index}>
										<ListItemIcon><Avatar alt="Real Name" src="https://lh3.googleusercontent.com/a/AATXAJyV5x-KGJctWAnEDEmr5RwJQa0fi9TaxtxTAP2X=s96-c" /></ListItemIcon>
										<StylesProvider injectFirst>
											<ListItemText
												primary={text}
												secondary="@username"
												className="textOverflow2"
											/>
										</StylesProvider>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="myButton" fontSize="1rem">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}