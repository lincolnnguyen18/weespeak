import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import BlankAppbar from './BlankAppbar' 
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
	return (
			<div className={classes.root}>
				<BlankAppbar />
				<Typography
					className={classes.slogan}
					variant="h4"
				>
					Sorry, that page was not found.
				</Typography>
			</div>
	)
}
