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
import ReactDOM from 'react-dom'
import { StylesProvider } from "@material-ui/core/styles";
import "./addFriendDialogOverride.css";

export default function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
	const [findFriends, setFindFriends] = React.useState(null);

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
      // const { current: descriptionElement } = descriptionElementRef;
      // if (descriptionElement !== null) {
      //   descriptionElement.focus();
      // }
			console.log('opened!')
    }
  }, [open]);

	const handleScroll = (e) => {
		if (open) {
			let target = e.target
			let scrollPos = (target.scrollHeight - target.scrollTop) - target.clientHeight
			// console.log(scrollPos)
			if (scrollPos == 0) {
				console.log("load more people!")
			}
		}
	}

	React.useEffect(() => {
		// real data
		fetch('http://localhost:1234/users?page=1&search=')
			.then(res => res.json())
			.then(
				(result) => {
					// setUserInfo({name: result.name, username: result.username, email: result.email});
					// console.log(result['results'][0]['name'])
					console.log(result['results'])
				},
				(error) => {
					console.error(error)
				}
			)
	}, [])

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
							placeholder="Enter your friend's name or @username here"
							inputProps={{ "aria-label": "description" }}
							fullWidth
							autoComplete="off"
							autoFocus
							type="search"
						/>
					</StylesProvider>
        </DialogTitle>
        <DialogContent
					dividers={scroll === "paper"}
					onScroll={handleScroll}
				>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
          >
            <List>
							{Array(15).fill({
									"friends": [],
								"_id": "77777",
								"name": "THIS IS A TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
								"username": "@TEST_TEST_EST_TEST_123",
								"__v": 0
								}).map((person, index) => (
                <>
                  <ListItem button key={index}>
										<ListItemIcon><Avatar alt="Real Name" src="https://lh3.googleusercontent.com/a/AATXAJyV5x-KGJctWAnEDEmr5RwJQa0fi9TaxtxTAP2X=s96-c" /></ListItemIcon>
										<StylesProvider injectFirst>
											<ListItemText
												primary={person['name']}
												secondary={person['username']}
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