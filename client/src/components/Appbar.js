import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";
import logo from '../whiteBadge/512x512.svg';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#9dbad8",
		}
	}
});

const useStyles = makeStyles((theme) => ({
	title: {
		flexGrow: 1,
	},
	appbar: {
		alignItems: "center",
		// left: 'auto',
		// right: 'auto',
		// width: '99%',
		// top: '1%',
		// borderRadius: '.7em',
	},
	logo: {
		maxWidth: "40px",
		marginRight: "10px"
	},
	homeButton: {
		textDecoration: 'none',
		display: 'flex',
		alignItems: 'center'
	},
}));

export default function ButtonAppbar() {
	const classes = useStyles();

	return (
		<ThemeProvider theme={theme}>
			<AppBar position="fixed" className={classes.appbar}>
				<Toolbar>
					<a
						href="/"
						className={classes.homeButton}
					>
						<img src={logo} alt="logo" className={classes.logo} />
						<Typography
							style={{
								cursor: "pointer",
								userSelect: "none",
								color: "#FFFFFF",
								fontSize: "1.4rem",
								fontWeight: "500",
								lineHeight: "1.6",
								letterSpacing: "0.0075em",
							}}
						>
							WeeSpeak
						</Typography>
					</a>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

