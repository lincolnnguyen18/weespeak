import React, {useState} from "react";
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
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
	let [findFriends, setFindFriends] = useState([]);
	let [findFriendsPage, setFindFriendsPage] = useState(1)
	let [searchTerm, setSearchTerm] = useState("")

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
	
  const handleClose = () => {
    setOpen(false);
  };

	const updateSearch = (e) => {
		let currentQuery = e.target.value
		if (currentQuery !== searchTerm) {
			setTimeout(() => {
				if (currentQuery.trim().length !== 0) {
					setSearchTerm(currentQuery)
					fetchMorePeople(currentQuery, true, 1)
				} else {
					setFindFriends([])
					setSearchTerm("")
				}
				setFindFriendsPage(1)
			}, 100);
		}
	}

	const doSearch = (e) => {
		if (e.keyCode === 13) {
			let searchThing = e.target.value
			if (searchThing.trim().length !== 0) {
				setSearchTerm(searchThing)
				fetchMorePeople(searchThing, true, 1)
				setFindFriendsPage(1)
			} else {
				setFindFriends([])
				setSearchTerm("")
			}
		}
	}

	const dialogContentRef = React.useRef(null);
  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
			setFindFriends([])
			setSearchTerm("")
    }
  }, [open]);

	const handleScroll = (e) => {
		if (open) {
			let target = e.target
			let scrollPos = (target.scrollHeight - target.scrollTop) - target.clientHeight
			if (scrollPos < 2 && searchTerm !== "") {
				fetchMorePeople(searchTerm, false, findFriendsPage + 1)
				setFindFriendsPage(findFriendsPage += 1)
			}
		}
	}

	const fetchMorePeople = (searchWord, newSearch, page) => {
		// console.log(`finding page: ${page} and searching for ${searchWord}`)
		fetch(`http://localhost:5000/user/search?page=${page}&search=${escape(searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))}&limit=${Math.ceil(window.innerHeight / 76)}`)
			.then(res => res.json())
			.then(
				(result) => {
					if (newSearch && result['results'].length === 0) {
						setFindFriends([])
					} else if (newSearch) {
						setFindFriends(result['results'])
					} else {
						if (page === 1) {
							setFindFriends(result['results'])
						} else {
							setFindFriends([...findFriends, ...result['results']])
						}
					}
				},
				(error) => {
					console.error(error)
				}
			)
	}

	// React.useEffect(() => {
	// }, [])

  return (
    <div>
      <ListItem button key='Find a Friend' onClick={handleClickOpen("paper")}>
        <ListItemText primary='Find a Friend' />
        <ListItemIcon><AddIcon style={{marginLeft: "28px"}}/></ListItemIcon>
      </ListItem>
			<StylesProvider injectFirst>
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
								onKeyDown={doSearch}
								onChange={updateSearch}
								autoFocus
								id="dialogInput"
								type="text"
							/>
						</StylesProvider>
					</DialogTitle>
					<DialogContent
						dividers={scroll === "paper"}
						onScroll={handleScroll}
						ref={dialogContentRef}
						// style={{display: findFriends.length === 0 ? 'none' : 'block'}}
					>
						<DialogContentText
							id="scroll-dialog-description"
							ref={descriptionElementRef}
						>
							{/* <List>
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
							</List> */}
							<List>
								{ findFriends.map((person, index) => (
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
									))
								}
							</List>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} className="cancelButton" fontSize="1rem">
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			</StylesProvider>
    </div>
  );
}