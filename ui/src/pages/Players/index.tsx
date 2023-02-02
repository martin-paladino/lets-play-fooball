import { useEffect, useState } from "react";
import SearchBar from "../../components/players/search-bar";
import CardsList from "../../components/shared/cards-list";
import { Player } from "../../types";

const Players: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getPlayers = async () => {
            const response = await fetch(searchTerm ? `http://localhost:8000/api/players/?search=${searchTerm}` :
                "http://localhost:8000/api/players/");
            try {
                const data = await response.json();
                setPlayers(data);
            } catch (error) {
                console.log(error);
            }
        };
        getPlayers();
    }, [searchTerm]);

    return (
        <>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <CardsList list={players} />
        </>
    );
};

export default Players;