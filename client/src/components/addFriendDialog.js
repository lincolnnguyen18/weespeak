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

	let timeout;
	let page = React.useRef();
	let fetchInProgress = React.useRef();
	let noMoreToLoad = React.useRef();
	let text = React.useRef();
	let [findFriends, setFindFriends] = useState([]);
	let [dialogTitle, setDialogTitle] = useState("Find a Friend") 

	const handleClickOpen = (scrollType) => () => {
		setOpen(true);
		setScroll(scrollType);
	};

	const handleClose = () => {
		setOpen(false);
	};

	React.useEffect(() => {
		if (open) {
			setFindFriends([])
			text.current = ""
			console.log('Find a Friend')
			setDialogTitle("Find a Friend")
		}
	}, [open]);

	React.useEffect(() => {
		fetchInProgress.current = false
	}, [findFriends]);

	// Scroll function
	const handleScroll = async (e) => {
		// Don't interrupt fetch/search in progress, don't load more if end of list reached
		if (fetchInProgress.current === true || noMoreToLoad.current === true) {
			return
		}

		// Don't load more unless scroll position at bottom
		let reachedBottom = e.target.scrollHeight - e.target.offsetHeight - e.target.scrollTop < 1
		if (!reachedBottom) {
			return
		}

		console.log('Loading...')
		setDialogTitle("Loading...")
		fetchInProgress.current = true
		page.current += 1

		// Fetch next page for users matching search
		await fetch(`${process.env.REACT_APP_MAIN_URL}/user/search?page=${page.current}&search=${escape(text.current.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))}&limit=${Math.ceil(window.innerHeight / 76)}`)
		.then(res => res.json())
		.then(result => {
			if (result['results'].length === 0) {
				// setDialogTitle(`No more users match "${text.current}"`)
				console.log(`No more users match "${text.current}"`)
				noMoreToLoad.current = true
				fetchInProgress.current = false
			} else {
				// setDialogTitle(`Users matching "${text.current}"`)
				console.log(`Users matching "${text.current}"`)
				setFindFriends([...findFriends, ...result['results']])
				if (result['results'].length < Math.ceil(window.innerHeight / 76)) {
					noMoreToLoad.current = true
					fetchInProgress.current = false
				}
			}
		})
	}

	// Search function
	const search = async (text) => {
		// Don't interrupt fetch in progress
		if (fetchInProgress.current === true) {
			return
		}

		fetchInProgress.current = true
		noMoreToLoad.current = false
		page.current = 1

		await fetch(`${process.env.REACT_APP_MAIN_URL}/user/search?page=1&search=${escape(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))}&limit=${Math.ceil(window.innerHeight / 76)}`)
		.then(res => res.json())
		.then(result => {
			result = result['results']
			if (result.length < Math.ceil(window.innerHeight / 76)) {
				noMoreToLoad.current = true
			}
			if (result.length === 0) {
				// setDialogTitle(`No users found matching "${text}"`)
				console.log(`No users match "${text}"`)
			}
			if (findFriends.length > 0) {
				console.log(`Users matching "${text}"`)
			}
			setFindFriends(result)
		})
	};

	/**
	 * Immediately search current input as long as cooldown timer not active
	 * When cooldown done, if current input different then search again and refresh cooldown
	 */
	const handleSearch = (e) => {
		// Don't search duplicate strings
		let value = e.target.value.trim()
		if (value === text.current) {
			return
		} else {
			text.current = value
		}

		// Clear and reset list without searching for empty strings
		if (e.target.value.trim().length === 0) {
			console.log("Find a Friend")
			setDialogTitle("Find a Friend")
			setFindFriends([])
			return
		}

		console.log("Loading...")
		setDialogTitle("Loading...")

		// Otherwise search if user has stopped typing for # ms
		clearTimeout(timeout);

    timeout = setTimeout(() => {
			console.log("Execute search!")
			value = e.target.value.trim()
			search(value)
		}, 2000);
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
									// onChange={updateSearch}
									onChange={handleSearch}
								/>
						</DialogTitle>
					</StylesProvider>
					<DialogContent
						dividers={scroll === "paper"}
						onScroll={handleScroll}
					// style={{display: findFriends.length === 0 ? 'none' : 'block'}}
					>
						<DialogContentText
							id="scroll-dialog-description"
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