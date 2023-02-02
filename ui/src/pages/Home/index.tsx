import React from 'react';
import { Typography, Button, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1, height: '100vh' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                    <Link to="/jugadores" style={{ textDecoration: "none" }}>
                        <Button variant="contained">
                            Jugadores
                        </Button>
                    </Link>
                    <Link to="/equipos" style={{ textDecoration: "none" }}>
                        <Button variant="contained">
                            Equipos
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;