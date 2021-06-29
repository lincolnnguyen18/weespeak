import React from 'react'
import Typography from '@material-ui/core/Typography'
import GoogleButton from 'react-google-button'
import Appbar from './Appbar' 
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
const theme = createMuiTheme();

theme.typography.h4 = {
	fontSize: '2rem',
	[theme.breakpoints.up('md')]: {
		fontSize: '2.4rem',
	},
};

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		flexDirection: "column",
		marginLeft: '5%',
		marginRight: '5%',
	},
	slogan: {
		marginBottom: "2em",
		textAlign: "center"
	}
}));

export default function Login() {
	const classes = useStyles();

	return (
			<div className={classes.root}>
				<Appbar />
				<ThemeProvider theme={theme}>
					<Typography
						className={classes.slogan}
						variant="h4"
					>
						Live Speech Recognition for You and Your Friends!
					</Typography>
				</ThemeProvider>
				<a href="/auth/google" style={{textDecoration: 'none'}}>
					<GoogleButton />
				</a>
			</div>
	)
}
