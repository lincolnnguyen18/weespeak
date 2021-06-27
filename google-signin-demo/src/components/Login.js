import React from 'react'
import Typography from '@material-ui/core/Typography'
// import Button from '@material-ui/core/Button'
import GoogleButton from 'react-google-button'
// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column"
    },
}));

export default function Login() {
    const classes = useStyles();
    return (
            <div className={classes.root}>
                <Typography display="block"
                    variant="h4"
                >
                    Live Speech Recognition for You and Your Friends!
                </Typography>

                <GoogleButton
                  onClick={() => { console.log('Google button clicked') }}
                />
            </div>
    )
}
