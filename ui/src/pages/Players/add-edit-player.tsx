import { useEffect, useState } from "react";
import { Player, PlayerPayload, Team } from "../../types";
import { Typography } from "@mui/material";
import PlayerForm from "../../components/players/player-form";

const AddEditPlayer: React.FC = () => {
    const [player, setPlayer] = useState<Player | null>(null);
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const playerLS = localStorage.getItem("player");
        playerLS && setPlayer(JSON.parse(playerLS));

        const getTeams = async () => {
            const response = await fetch("http://localhost:8000/api/teams/");
            try {
                const data = await response.json();
                setTeams(data);
            } catch (error) {
                console.log(error);
            }
        }
        getTeams();
    }, []);

    return (
        <>
            <Typography variant="h4">{player ? "Editar" : "Agregar"} Jugador</Typography>
            <PlayerForm teams={teams} player={player} />
        </>
    );
};

export default AddEditPlayer;