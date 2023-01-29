import React, { useEffect } from 'react';
import { Typography, Card, CardContent, CardMedia, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { Player } from '../../types';

const useStyles: any = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        margin: theme.spacing(2),
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
}));

const PlayerDetails: React.FC = () => {
    const [player, setPlayer] = React.useState<Player>();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        const getPlayer = async () => {
            const response = await fetch(`http://localhost:8000/api/players/${id}/`);
            try {
                const data = await response.json();
                console.log("data", data)
                setPlayer(data);
            } catch (error) {
                console.log(error);
            }
        };
        getPlayer();
    }, []);

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                image={player?.picture}
                title={player?.name}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {player?.name}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Número de camiseta: {player?.shirt_number}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Posición: {player?.position}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Equipo: {player?.team?.name || "-"}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Altura: {player?.height} m
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Peso: {player?.weight} kg
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Fecha de nacimiento: {player?.birth_date}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Edad: {player?.age} años
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Pie hábil: {player?.foot}
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
};

export default PlayerDetails;