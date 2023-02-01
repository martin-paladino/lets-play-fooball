import { useEffect, useState } from "react";
import { Team } from "../../types";
import { Typography } from "@mui/material";
import TeamForm from "../../components/teams/team-form";

const AddEditTeam: React.FC = () => {
    const [team, setTeam] = useState<Team | null>(null);

    useEffect(() => {
        const teamLS = localStorage.getItem("team");
        teamLS && setTeam(JSON.parse(teamLS));
    }, []);

    return (
        <>
            <Typography variant="h4">{team ? "Editar" : "Agregar"} Equipo</Typography>
            <TeamForm team={team} />
        </>
    );
};

export default AddEditTeam;