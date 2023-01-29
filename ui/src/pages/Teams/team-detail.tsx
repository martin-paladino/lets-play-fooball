import React, { useEffect } from 'react';
import { Typography, Card, CardContent, CardMedia, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { Team } from '../../types';

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

const TeamDetails: React.FC = () => {
    const [team, setTeam] = React.useState<Team>();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        const getTeam = async () => {
            const response = await fetch(`http://localhost:8000/api/teams/${id}/`);
            try {
                const data = await response.json();
                setTeam(data);
            } catch (error) {
                console.log(error);
            }
        };
        getTeam();
    }, []);

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                image={team?.team_shield}
                title={team?.name}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {team?.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {team?.country}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Jugadores: {team?.number_of_players || 0}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Edad promedio: {team?.average_age || "-"} 
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
};

export default TeamDetails;