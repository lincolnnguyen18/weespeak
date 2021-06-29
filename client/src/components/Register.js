import React from 'react'
import Typography from '@material-ui/core/Typography'
import Appbar from './Appbar' 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
	},
	textfield: {
		'& .MuiTextField-root': {
			fontSize: '3em',
			margin: theme.spacing(1),
			width: '12ch',
		},
		'& #standard-secondary-label': {
			fontSize: '.45em'
		},
		'& .MuiInputBase-input': {
			fontSize: '2em'
		},
		'& .MuiFormLabel-colorSecondary.Mui-focused': {
			color: '#5a8bbd'
		},
		'& .MuiInput-colorSecondary.MuiInput-underline:after': {
			borderBottomColor: '#5a8bbd'
		},
		'& .MuiButton-contained': {
			marginLeft: '2em',
			borderRadius: '1.5em',
			height: '75%',
		},
		display: 'flex',
		alignItems: 'center',
	},
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
						Please choose a username:
					</Typography>
				</ThemeProvider>
				<form className={classes.textfield} inputProps={{ pattern: "[a-z]{1,15}" }} noValidate autoComplete="off">
					<TextField id="standard-secondary" color="secondary" label="Enter a username here" autoFocus />
					<Button variant="contained" disabled>
						Submit
					</Button>
				</form>
			</div>
	)
}
