import { Typography, Box, Card as MaterialCard, CardContent, CardMedia } from '@mui/material';
import { Player, Team } from '../../types';
import { useNavigate } from 'react-router-dom';

interface CardProps {
    elem: Team | Player;
}

const Card: React.FC<CardProps> = ({ elem }) => {
    const navigate = useNavigate();

    return (
        <MaterialCard sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={("team_shield" in elem) ? elem.team_shield : elem.picture}
                alt={("team_shield" in elem) ? "Escudo del equipo" : "Foto del jugador"}
                onClick={() => navigate(("team_shield" in elem) ? `/equipos/${elem.id}` : `/jugadores/${elem.id}`)}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5"
                    >
                        {elem.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {("country" in elem) ? elem.country : elem.shirt_number}
                    </Typography>
                </CardContent>
            </Box>
        </MaterialCard>
    );
};

export default Card;