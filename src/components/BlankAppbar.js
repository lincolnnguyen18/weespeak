import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";

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
        alignItems: "center"
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" className={classes.appbar}>
                <Toolbar>
                    <WhiteTextTypography variant="h5" className={classes.title}>
                        WeeSpeak
                    </WhiteTextTypography>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

