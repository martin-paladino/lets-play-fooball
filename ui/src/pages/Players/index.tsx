import { useEffect, useState } from "react";
import CardsList from "../../components/shared/cards-list";
import { Player } from "../../types";

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
            <CardsList list={players} />
        </>
    );
};

export default Players;