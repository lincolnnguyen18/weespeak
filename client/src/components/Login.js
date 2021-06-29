import React from 'react'
import Typography from '@material-ui/core/Typography'
import GoogleButton from 'react-google-button'
import { makeStyles } from '@material-ui/core/styles';
import BlankAppbar from './BlankAppbar' 
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		flexDirection: "column"
	},
	slogan: {
		marginBottom: "2em"
	}
}));

export default function Login() {
	const classes = useStyles();
	const history = useHistory();

	return (
			<div className={classes.root}>
				<BlankAppbar />
				<Typography
					className={classes.slogan}
					variant="h4"
				>
					Live Speech Recognition for You and Your Friends!
				</Typography>
				<GoogleButton
				  onClick={() => { window.location.href="/auth/google" }}
				/>
				{/*Testing SPA routing*/}
				{/*<GoogleButton
				  onClick={() => history.push("/auth/google")}
				/>*/}
			</div>
	)
}
