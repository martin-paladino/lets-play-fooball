import { useEffect, useState } from "react";
import CardsList from "../../components/shared/cards-list";
import { Team } from "../../types";

const Teams: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const getTeams = async () => {
            const response = await fetch("http://localhost:8000/api/teams/");
            try {
                const data = await response.json();
                setTeams(data);
            } catch (error) {
                console.log(error);
            }
        };
        getTeams();
    }, []);

    return (
       <>
        <CardsList list={teams} />
       </>
    );
};

export default Teams;