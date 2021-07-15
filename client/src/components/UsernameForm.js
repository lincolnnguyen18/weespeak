import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
const theme = createMuiTheme();

theme.typography.h4 = {
	fontSize: '2rem',
	[theme.breakpoints.up('md')]: {
		fontSize: '2.4rem',
	},
	marginBottom: '2em',
	textAlign: 'center',
};

const useStyles = makeStyles((theme) => ({
	textfield: {
		'& .MuiTextField-root': {
			fontSize: '3em',
			margin: theme.spacing(1),
			width: '13ch',
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
			borderRadius: '1.5em',
			height: '4.7em',
			marginLeft: '0em',
			marginTop: '2em',
			[theme.breakpoints.up(445)]: {
				marginLeft: '1em',
				marginTop: '0em',
			},
		},
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
}));


// inputProps={{ className: classes.input, pattern: "[a-zA-Z0-9_]{4,15}" }}

export default function UsernameForm() {
	const classes = useStyles();
	const [error, setError] = useState(false);
	const [ready, setReady] = useState(false);
	const [errorMessage, setErrorMessage] = useState(' ');

	function handleFormChange(event) {
		let textfield = event.target;
		let username = event.target.value;
		console.log(username);
		// check length
		if (username.length < 1) {
			setError(true);
			setReady(false);
			setErrorMessage('Username must have at least 1 character.');
		} else if (username.length > 15 ) {
			setError(true);
			setReady(false);
			setErrorMessage('Username cannot be longer than 15 characters.');
		} else if (!/^[a-zA-Z0-9_]{1,15}$/.test(username)) {
			setError(true);
			setReady(false);
			setErrorMessage('Only have alphanumeric or underscore characters allowed.');
		} else {
			setError(false);
			setReady(true);
			setErrorMessage(' ');
		}
	}

	return (
		<>
			<ThemeProvider theme={theme}>
				<Typography
					className={classes.slogan}
					variant="h4"
				>
					Please choose a username:
				</Typography>
			</ThemeProvider>
			<form className={classes.textfield} noValidate autoComplete="off">
				<TextField
					inputProps={{style: {fontSize: '2em'}}} // font size of input text
					InputLabelProps={{style: {fontSize: '.55em'}}} // font size of input label
					id={error ? "standard-error-helper-text" : "standard-secondary"}
					color="secondary"
					label="Enter a username here"
					autoFocus
					onChange={handleFormChange}
					error={error}
					helperText={errorMessage}
				/>
				<Button
					variant="contained"
					disabled={!ready}
					onclick={() => console.log("cilcked!")}
				>
					Confirm
				</Button>
			</form>
		</>
	)
}
