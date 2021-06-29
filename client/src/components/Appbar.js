import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Appbar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";
import logo from '../whiteBadge/512x512.svg';

const WhiteTextTypography = withStyles({
	root: {
		color: "#FFFFFF"
	}
})(Typography);

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
		left: 'auto',
		right: 'auto',
		width: '99%',
		borderRadius: '.7em',
		minWidth: '500px'
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
			<Appbar position="fixed" className={classes.appbar}>
				<Toolbar>
					<a
						href="/"
						className={classes.homeButton}
					>
						<img src={logo} alt="logo" className={classes.logo} />
						<WhiteTextTypography
							variant="h5"
							style={{
								cursor: "pointer",
								userSelect: "none"
							}}
						>
							WeeSpeak
						</WhiteTextTypography>
					</a>
				</Toolbar>
			</Appbar>
		</ThemeProvider>
	);
}

