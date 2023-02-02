import { Link, useLocation } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';

const useStyles: any = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        color: 'white',
        margin: 0
    },
});

const Navbar: React.FC = () => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Grid container>
            <Grid item xs={3}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button style={{ boxShadow: "none" }} variant="contained"><HomeIcon /></Button>
              </Link>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "center" }}>
              <Typography variant="h6">Let's play football</Typography>
            </Grid>
            <Grid item xs={3} style={{ textAlign: "right" }}>
              {location.pathname === "/equipos" && (
                <Link to="/equipos/nuevo" style={{ textDecoration: "none" }}>
                  <Button style={{ boxShadow: "none" }} variant="contained"><AddIcon /></Button>
                </Link>
              )}
              {location.pathname === "/jugadores" && (
                <Link to="/jugadores/nuevo" style={{ textDecoration: "none" }}>
                  <Button style={{ boxShadow: "none" }} variant="contained"><PersonAddIcon /></Button>
                </Link>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
};

export default Navbar;