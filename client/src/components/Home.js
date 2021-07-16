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
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
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
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
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
		marginTop: `${window.innerHeight / 4}px`,
	},
	greeting2: {
		fontSize: '2em',
		textAlign: 'center',
		marginTop: '1em',
	}
}));

export default function PersistentDrawerLeft() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [userInfo, setUserInfo] = React.useState({username: "", name: "", email: ""});
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

	useEffect(() => {
		// real data
		fetch('http://localhost:5000/profile/getUserInfo')
		// mock data
		// fetch("http://localhost:3000/getUserInfo")
			.then(res => res.json())
			.then(
				(result) => {
					setUserInfo({username: result.username, name: result.name, email: result.email});
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
						<img src={logo} alt="logo" className={classes.logo} />
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
							<MenuItem onClick={() => { window.location.href = "/auth/logout" }}>Logout</MenuItem>
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
					{['Add Friend'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemText primary={text} />
							<ListItemIcon><AddIcon style={{marginLeft: "28px"}}/></ListItemIcon>
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{['Friend 1', 'Friend 2', 'Friend 3'].map((text, index) => (
						<ListItem button key={text}>
							{/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
							<ListItemText primary={text} />
							<ListItemIcon><FiberManualRecordIcon style={{ width: "20px", marginLeft: "31px"}} /></ListItemIcon>
						</ListItem>
					))}
				</List>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />
				{/* <Typography paragraph>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
					facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
					gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
					donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
					adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
					Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
					imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
					arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
					donec massa sapien faucibus et molestie ac.
				</Typography> */}
				<Typography className={classes.greeting} style={{ marginLeft: open ? '-1em' : '.1em' }}>
					Hello {userInfo.name}.
				</Typography>
				<Typography className={classes.greeting2} style={{ marginLeft: open ? '-1em' : '.1em' }}>
					You are currently logged in using: <b>{userInfo.email}</b>.
				</Typography>
				<Typography className={classes.greeting2} style={{ marginLeft: open ? '-1em' : '.1em' }}>
					Your username is: <b>{userInfo.username}</b>.
				</Typography>
			</main>
		</div>
	);
}