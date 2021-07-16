import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
import Input from "@material-ui/core/Input";
import { StylesProvider } from "@material-ui/core/styles";
import "./usernameFormOverride.css";
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
	helper: {
		'.MuiFormHelperText-root': {
			position: "absolute",
			marginTop: "5em",
		},
	},
	textfield: {
		'& .MuiTextField-root': {
			fontSize: '3em',
			margin: theme.spacing(1),
			marginTop: "0.5em",
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
		'& .MuiInput-colorSecondary.MuiInput-underline.Mui-error:after': {
			borderBottomColor: 'red'
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

export default function UsernameForm() {
	const classes = useStyles();
	const [error, setError] = useState(false);
	const [ready, setReady] = useState(false);
	const [errorMessage, setErrorMessage] = useState(' ');
	let username = ""

	function handleFormChange(event) {
		username = event.target.value;

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
			postData('http://localhost:5000/profile/isUsernameAvailable', { username: username })
			.then(data => {
				// console.log(data['exists'])
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
				} else if (username.length > 0 && data['exists'] === "yes") {
					setError(true);
					setReady(false);
					setErrorMessage('Username is taken. Please pick a different username.');
				} else {
					setError(false);
					setReady(true);
					setErrorMessage(' ');
				}
			});
		}
	}

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

	function sendUsername() {
		console.log(username);
		postData('http://localhost:5000/profile/registerUsername', { username: username })
		.then(data => {
			console.log(data); // JSON data parsed by `data.json()` call
			if (data["status"] === "success") {
				window.location.href = '/home'
			}
		});
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
			<StylesProvider injectFirst>
				<form className={classes.textfield} noValidate autoComplete="off">
					<TextField
						inputProps={{style: {fontSize: '2em'}}} // font size of input text
						InputLabelProps={{style: {fontSize: '.55em'}}} // font size of input label
						id={error ? "standard-error-helper-text" : "standard-secondary"}
						color="secondary"
						label=""
						placeholder="Enter username here"
						autoFocus
						onChange={handleFormChange}
						error={error}
						helperText={errorMessage}
					/>
					<Button
						variant="contained"
						disabled={!ready}
						// onClick={() => { console.log("cilcked!") }}
						onClick={ sendUsername }
					>
						Confirm
					</Button>
				</form>
			</StylesProvider>
		</>
	)
}
