import React from 'react'
import Appbar from './Appbar' 
import { makeStyles } from '@material-ui/core/styles';

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
}));

export default function Home() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Appbar />
		</div>
	)
}
