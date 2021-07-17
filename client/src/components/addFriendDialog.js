import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import { StylesProvider } from "@material-ui/core/styles";
import "./addFriendDialogOverride.css";
import TextField from '@material-ui/core/TextField';

export default function ScrollDialog() {
	const [open, setOpen] = useState(false);
	const [scroll, setScroll] = useState("paper");
	let [findFriends, setFindFriends] = useState([]);
	let [findFriendsPage, setFindFriendsPage] = useState(1)
	let [searchTerm, setSearchTerm] = useState("")
	let [waiting, setWaiting] = useState(true)
	let [updating, setUpdating] = useState(true)
	let [dialogTitle, setDialogTitle] = useState("Find a Friend")

	const handleClickOpen = (scrollType) => () => {
		setOpen(true);
		setScroll(scrollType);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const updateSearch = (e) => {
		if (updating) {
			setUpdating(false)
			setWaiting(false)
			if (e.target.value.trim().length !== 0 && e.target.value !== searchTerm) {
				setDialogTitle("Loading...")
			} else if (e.target.value.trim().length === 0) {
				setDialogTitle("Find a Friend")
			}
			setTimeout(() => {
				if (e.target.value !== searchTerm) {
					setFindFriends([])
					setFindFriendsPage(1)
					if (e.target.value.trim().length !== 0) {
						// setDialogTitle("Searching...")
						setSearchTerm(e.target.value)
						fetchMorePeople(e.target.value, true, 1).then(() => {
							setUpdating(true)
							setWaiting(true)
						})
					} else {
						setFindFriends([])
						setSearchTerm("")
						setFindFriendsPage(1)
						setUpdating(true)
						setWaiting(true)
						console.log(`current page is ${findFriendsPage} and waiting is ${waiting}`)
					}
				}
			}, 1000);
		}
	}

	// const doSearch = (e) => {
	// 	if (e.keyCode === 13) {
	// 		setDialogTitle("Searching...")
	// 		let searchThing = e.target.value
	// 		if (searchThing.trim().length !== 0) {
	// 			setWaiting(true)
	// 			setFindFriendsPage(1)
	// 			setSearchTerm(searchThing)
	// 			fetchMorePeople(searchThing, true, 1).then(() => {
	// 				setUpdating(true)
	// 			})
	// 		} else {
	// 			setFindFriends([])
	// 			setSearchTerm("")
	// 			setDialogTitle("Find a Friend")
	// 		}
	// 	}
	// }

	const dialogContentRef = React.useRef(null);
	const descriptionElementRef = React.useRef(null);

	React.useEffect(() => {
		if (open) {
			setFindFriends([])
			setSearchTerm("")
		}
	}, [open]);

	// Browser dev tools debugging
	// target = document.getElementsByClassName("MuiDialogContent-root")[0]
	const handleScroll = async (e) => {
		let target = e.target
		let reachedBottom = target.scrollHeight - target.offsetHeight - target.scrollTop < 1
		if (open && reachedBottom & waiting & searchTerm !== "") {
			if (findFriendsPage == 1) {
				setFindFriendsPage(findFriendsPage += 1)
			}
			setWaiting(false)
			setDialogTitle("Loading more...")
			await fetchMorePeople(searchTerm, false, findFriendsPage).then(() => {
				console.log("finished fetching")
				setFindFriendsPage(findFriendsPage += 1)
			})
		}
	}

	const fetchMorePeople = async (searchWord, newSearch, page) => {
		// console.log(`finding page: ${page} and searching for ${searchWord}`)
		// fetch(`http://localhost:5000/user/search?page=${page}&search=${escape(searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))}&limit=${Math.ceil(window.innerHeight / 76)}`)
		await fetch(`${process.env.REACT_APP_MAIN_URL}/user/search?page=${page}&search=${escape(searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))}&limit=${Math.ceil(window.innerHeight / 76)}`)
			.then(res => res.json())
			.then(
				(result) => {
					if (result['results'].length === 0) {
						console.log("no more to show")
						setWaiting(false)
						setDialogTitle("No more to load.")
					} else {
						setWaiting(true)
						setDialogTitle(`Users matching "${searchWord}"`)
					}
					if (newSearch && result['results'].length === 0) {
						setFindFriends([])
						setDialogTitle(`No users found for "${searchWord}"`)
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
				<ListItemIcon><AddIcon style={{ marginLeft: "28px" }} /></ListItemIcon>
			</ListItem>
			<StylesProvider injectFirst>
			<form noValidate autoComplete="off">
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
					<StylesProvider injectFirst>
						<DialogTitle id="scroll-dialog-title" style={{ textAlign: "center" }}>
							{dialogTitle}
							<br />
								<TextField
									label=""
									placeholder="Enter your friend's name or @username"
									autoFocus
									fullWidth
									id="dialogInput"
									// onKeyDown={doSearch}
									onChange={updateSearch}
								/>
						</DialogTitle>
					</StylesProvider>
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
								{findFriends.map((person, index) => (
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
				</form>
			</StylesProvider>
		</div>
	);
}