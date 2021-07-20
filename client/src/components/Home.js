import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import logo from '../whiteBadge/512x512.svg';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import AddFriendDialog from './addFriendDialog';
import Avatar from '@material-ui/core/Avatar';
import { StylesProvider } from "@material-ui/core/styles";
import "./homeOverride.css";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
	root: {
		// display: 'flex',
		height: "100%",
		marginLeft: {drawerWidth}
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		backgroundColor: "#9dbad8",
		color: "#FFFFFF",
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		// marginLeft: -drawerWidth,
		height: "100%",
		display: "grid",
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: drawerWidth,
	},
	title: {
		flexGrow: 1,
		userSelect: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	logo: {
		maxWidth: "40px",
		marginRight: "10px"
	},
	greeting: {
		fontSize: '3em',
		textAlign: 'center',
		// marginTop: `${window.innerHeight / 3.5}px`,
		marginTop: '0'
	},
	greeting2: {
		fontSize: '2em',
		textAlign: 'center',
		marginTop: '1em',
	},
	greetingBox: {
		marginTop: '-5%',
	}
}));

export default function PersistentDrawerLeft() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const ws = global.ws
	let [userInfo, setUserInfo] = React.useState({_id: "", name: "", username: "", email: "", picture: ""});
	let [receivedFriendRequests, setReceivedFriendRequests] = React.useState([])
	let [sentFriendRequests, setSentFriendRequests] = React.useState([])
	let [friends, setFriends] = React.useState([])
	const openProfile = Boolean(anchorEl);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		setAnchorEl(null);
		window.location.href = "/auth/logout";
	}

	React.useEffect(() => {
		if (userInfo.username !== "") {
			// ws.send(`client ${userInfo.username} with _id ${userInfo._id} has connected`)
			ws.send(JSON.stringify({
				req: "message",
				body: `client ${userInfo.username} has connected`,
			}))
			ws.send(JSON.stringify({
				req: "identification",
				body: userInfo._id,
			}))
		}
	}, [userInfo]);

	useEffect(() => {
		// Initialize ws client
		ws.onopen = () => {
			console.log("wss connection opened")
		}

		ws.onclose = () => {
			console.log("wss connection closed")
		}
		ws.onmessage = (event) => {
			let data = JSON.parse(event.data)
			switch (data.req) {
				case 'message':
					console.log(`Received message: ${data.body}`)
					break;
				case 'updateFriendRequests':
					console.log('YUP!')
					// fetch(`${process.env.REACT_APP_MAIN_URL}/user/friends`)
					// 	.then(res => res.json())
					// 	.then(
					// 		(result) => {
					// 			setFriendRequests(result.friendRequests)
					// 		},
					// 		(error) => {
					// 			console.error(error)
					// 		}
					// 	)
					break;
			}
		}
		ws.onerror = (err) => {
			console.log(err)
		}

		// console.log(`fetching from ${process.env.REACT_APP_MAIN_URL}/user/info`)
		fetch(`${process.env.REACT_APP_MAIN_URL}/user/info`)
			.then(res => res.json())
			.then(
				(result) => {
					setUserInfo({ _id: result._id, name: result.name, username: result.username, email: result.email, picture: result.picture });
				},
				(error) => {
					console.error(error)
				}
			)
		
		// console.log(`fetching from ${process.env.REACT_APP_MAIN_URL}/user/friends`)
		fetch(`${process.env.REACT_APP_MAIN_URL}/user/friends`)
			.then(res => res.json())
			.then(
				(result) => {
					setReceivedFriendRequests(result.requestsReceived)
					setSentFriendRequests(result.requestsSent)
					setFriends(result.friends)
				},
				(error) => {
					console.error(error)
				}
			)
	}, [])

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<div className={classes.title}>
						<span alt="logo" className={classes.logo} style={{
							backgroundImage: `url(${logo})`,
							backgroundSize: "cover",
							backgroundRepeat: "no-repeat",
							width: "40px",
							height: "40px",
						}}></span>
						<Typography
							noWrap
							style={{
								color: "#FFFFFF",
								fontSize: "1.4rem",
								fontWeight: "500",
								lineHeight: "1.6",
								letterSpacing: "0.0075em",
							}}
						>
							WeeSpeak
						</Typography>
					</div>

					<div>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={openProfile}
							onClose={handleClose}
						>
							{/* <MenuItem onClick={handleClose}>Settings</MenuItem> */}
							<MenuItem onClick={handleLogout}>Logout</MenuItem>
							<MenuItem onClick={handleClose}>Change name</MenuItem>
							<MenuItem onClick={handleClose}>Change username</MenuItem>
							<MenuItem onClick={handleClose}>Change profile picture</MenuItem>
							{/* <MenuItem onClick={handleClose}>Change profile description</MenuItem> */}
							<MenuItem onClick={handleClose}>Delete account</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					<AddFriendDialog />
				</List>
				<Divider />
				{/* receivedFriendRequests.forEach(requestReceived => {
						console.log(requestReceived.requester)
					})
					sentFriendRequests.forEach(requestSent => {
						console.log(requestSent.recipient)
					})
					friends.forEach(relationship => {
						if (relationship.requester) {
							console.log(relationship.requester)
						} else {
							console.log(relationship.recipient)
						}
					}) */}
				<List>
					{receivedFriendRequests.map(({requester} , index) => (
						<>
							<StylesProvider injectFirst>
								<ListItem button key={index}>
									<ListItemIcon><Avatar alt={requester.name} src={requester.picture} /></ListItemIcon>
									<ListItemText className="textOverflow" primary={requester.name} secondary={requester.username}/>
									<ListItemIcon><ErrorOutlineIcon style={{ width: "30px", height: "30px", marginLeft: "26px"}} /></ListItemIcon>
								</ListItem>
							</StylesProvider>
						</>
					))}
					{sentFriendRequests.map(({recipient}, index) => (
						<>
							<StylesProvider injectFirst>
								<ListItem button key={index}>
									<ListItemIcon><Avatar alt={recipient.name} src={recipient.picture} /></ListItemIcon>
									<ListItemText className="textOverflow" primary={recipient.name} secondary={recipient.username}/>
									<ListItemIcon><QueryBuilderIcon style={{ width: "30px", height: "30px", marginLeft: "26px"}} /></ListItemIcon>
								</ListItem>
							</StylesProvider>
						</>
					))}
					{friends.map(({requester, recipient}, index) => (
						<>
							<StylesProvider injectFirst>
								<ListItem button key={index}>
									<ListItemIcon><Avatar alt={requester ? requester.name : recipient.name} src={requester ? requester.picture : recipient.picture} /></ListItemIcon>
									<ListItemText className="textOverflow" primary={requester ? requester.name : recipient.name} secondary={requester ? requester.username : recipient.username}/>
									<ListItemIcon><FiberManualRecordIcon style={{ width: "20px", marginLeft: "31px"}} /></ListItemIcon>
								</ListItem>
							</StylesProvider>
						</>
					))}
				</List>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />
				<div className={classes.greetingBox}>
					<Typography className={classes.greeting}>
						Hello <b>{userInfo.name}</b>
					</Typography>
					<Typography className={classes.greeting2}>
						You are currently logged in using: <b>{userInfo.email}</b>
					</Typography>
					<Typography className={classes.greeting2}>
						Your username is: <b>{userInfo.username}</b>
					</Typography>
				</div>
			</main>
		</div>
	);
}