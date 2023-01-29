import { useEffect, useState } from "react";
import CardsList from "../../components/shared/cards-list";
import { Player } from "../../types";
import { Typography } from "@mui/material";


const Players: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        const getPlayers = async () => {
            const response = await fetch("http://localhost:8000/api/players/");
            try {
                const data = await response.json();
                setPlayers(data);
            } catch (error) {
                console.log(error);
            }
        };
        getPlayers();
    }, []);

    return (
        <>
        <Typography variant="h4">Jugadores</Typography>
        <CardsList list={players} />
        {/* AddPlayers button */}
       </>
    );
};

export default Players;