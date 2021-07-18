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
	let lastSearch = React.useRef();
	let currentSearch = React.useRef();
	let text = React.useRef();
	let [findFriends, setFindFriends] = useState([]);
	let [dialogTitle, setDialogTitle] = useState("Add a friend") 

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
			lastSearch.current = ""
			setDialogTitle("Add a friend")
		}
	}, [open]);

	React.useEffect(() => {
		fetchInProgress.current = false
	}, [findFriends]);

	// Scroll function
	const handleScroll = async (e) => {
		// Don't interrupt fetch/search in progress, don't load more if end of list reached
		if (noMoreToLoad.current === true || fetchInProgress.current === true) {
			return
		}

		// Don't load more unless scroll position at bottom
		// target = document.getElementsByClassName("MuiDialogContent-root")[0]
		let reachedBottom = e.target.scrollHeight - e.target.offsetHeight - e.target.scrollTop < 1
		if (!reachedBottom) {
			return
		}

		fetchInProgress.current = true
		page.current += 1
		console.log(`Loading page ${page.current} for ${currentSearch.current}...`)
		setDialogTitle(`Loading...`)
		let limit = Math.ceil(window.innerHeight / 76)
		let mongoEscapedSearch = escape(currentSearch.current.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
		
		// Fetch next page for users matching search
		await fetch(`${process.env.REACT_APP_MAIN_URL}/user/search?page=${page.current}&search=${mongoEscapedSearch}&limit=${limit}`)
		.then(res => res.json())
		.then(result => {
			if (result['results'].length < Math.ceil(window.innerHeight / 76)) {
				console.log(`No more users match "${currentSearch.current}"`)
				setDialogTitle(`No more users found`)
				noMoreToLoad.current = true
			} else {
				setDialogTitle("Add a friend")
			}
			setFindFriends([...findFriends, ...result['results']])
		})
	}

	// Search function
	const search = async () => {
		if (text.current.length === 0) {
			return
		}
		lastSearch.current = currentSearch.current
		currentSearch.current = text.current
		if (lastSearch.current === currentSearch.current) {
			console.log(`CLIENT IS REPEATING SEARCH; current = ${currentSearch.current}; last = ${lastSearch.current}`)
			return
		}

		// fetchInProgress.current = true
		noMoreToLoad.current = false
		page.current = 1
		let limit = Math.ceil(window.innerHeight / 76)
		let mongoEscapedSearch = escape(currentSearch.current.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
		let actualSearch = currentSearch.current

		await fetch(`${process.env.REACT_APP_MAIN_URL}/user/search?page=1&search=${mongoEscapedSearch}&limit=${limit}`)
		.then(res => res.json())
		.then(result => {
			result = result['results']
			if (result.length < Math.ceil(window.innerHeight / 76)) {
				noMoreToLoad.current = true
			}
			if (result.length > 0) {
				setDialogTitle(`Add a friend`)
				console.log(`Users matching "${actualSearch}"`)
				// Search again if user typed something new
				if (currentSearch.current !== text.current) {
					console.log("searching again")
					search()
				}
			} else {
				setDialogTitle(`No users found`)
				console.log(`No users match "${actualSearch}"`)
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
		if (value === text.current || value === currentSearch.current) {
			return
		} else {
			text.current = value
		}

		// Clear and reset list without searching for empty strings
		if (e.target.value.trim().length === 0) {
			console.log("Add a friend")
			setDialogTitle("Add a friend")
			setFindFriends([])
			currentSearch.current = ""
			return
		}

		setDialogTitle("Loading...")

		search()

		// Otherwise search if user has stopped typing for # ms
		// clearTimeout(timeout);
    // timeout = setTimeout(() => {
		// 	// console.log("Execute search!")
		// 	search()
		// }, 0);
	}

	// React.useEffect(() => {
	// }, [])

	async function postData(url = '', data = {}) {
		const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data) // body data type must match "Content-Type" header
		});
		return response.json(); // parses JSON response into native JavaScript objects
	}

	const handleItemClick = (person) => {
		console.log(person)
		postData(`/user/friends?fid=${person._id}`, {})
	}

	return (
		<div>
			<ListItem button key='Add a friend' onClick={handleClickOpen("paper")}>
				<ListItemText primary='Add a friend' />
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
									onKeyUp={handleSearch}
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
										<ListItem
											button
											key={index}
											onClick={() => handleItemClick(person)}
										>
											<ListItemIcon><Avatar alt={person['name']} src={person['picture']} /></ListItemIcon>
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