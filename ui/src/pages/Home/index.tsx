import { Typography, Button, Grid, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    button: {
        display: 'flex',
        width: '50%',
        height: '100px',
        margin: '20px 0',
    },
}));

const Home: React.FC = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Grid container spacing={10} marginTop={12}>
                <Grid item xs={12}>
                    <Link to="/jugadores" style={{ textDecoration: "none" }}>
                        <Button variant="contained" className={classes.button}>
                            Jugadores
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <Link to="/equipos" style={{ textDecoration: "none" }}>
                        <Button variant="contained" className={classes.button}>
                            Equipos
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;