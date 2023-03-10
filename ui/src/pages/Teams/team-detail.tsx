import React, { useEffect } from 'react';
import { Typography, Card, CardContent, CardMedia, Theme, Button, List, ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getTeam = async () => {
            const response = await fetch(`http://localhost:8000/api/teams/${id}/`);
            try {
                const data = await response.json();
                localStorage.setItem("team", JSON.stringify(data));
                setTeam(data);
            } catch (error) {
                console.log(error);
            }
        };
        getTeam();
    }, []);

    const handleDeleteTeam = async () => {
        await fetch(`http://localhost:8000/api/teams/${id}/`, {
            method: "DELETE",
        });
        try {
            navigate("/equipos");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.cover}
                    image={team?.team_shield || `${process.env.PUBLIC_URL}/images/no-picture.png`}
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
                        <Link to={`/equipos/${id}/editar`} style={{ textDecoration: "none" }}>
                            <Button>Editar</Button>
                        </Link>
                        <Button onClick={handleDeleteTeam}>Eliminar</Button>
                    </CardContent>
                </div>
            </Card>
            {<Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">Jugadores:</Typography>
                    {team && team.players?.length ? team?.players.map((player, i) => (
                        <Typography key={i} variant="subtitle2" color="textSecondary">
                            {player.name}
                        </Typography>
                    )) : <Typography variant="subtitle2" color="textSecondary">
                        El equipo a??n no tiene jugadores
                    </Typography>}
                </CardContent>
            </Card>}
        </div>
    );
};

export default TeamDetails;