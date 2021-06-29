import React from 'react'
import Typography from '@material-ui/core/Typography'
import GoogleButton from 'react-google-button'
import { makeStyles } from '@material-ui/core/styles';
import Appbar from './Appbar' 
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
				<Appbar />
				<Typography
					className={classes.slogan}
					variant="h4"
				>
					Live Speech Recognition for You and Your Friends!
				</Typography>
				<a href="/auth/google" style={{textDecoration: 'none'}}>
					<GoogleButton />
				</a>
				{/*Testing SPA routing*/}
				{/*<GoogleButton
				  onClick={() => history.push("/auth/google")}
				/>*/}
			</div>
	)
}
