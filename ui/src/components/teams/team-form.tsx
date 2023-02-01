import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import { TextField, Button, MenuItem, Theme } from "@mui/material"
import { Player, PlayerPayload, Team } from "../../types";
import { SelectChangeEvent } from "@mui/material/Select";
import { useLocation, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    formControl: {
        margin: theme.spacing(1),
        width: "25ch",
    },
    button: {
        display: "block !important",
        margin: theme.spacing(2),
    }
}));

interface TeamFormProps {
    team: Team | null;
}

const TeamForm: React.FC<TeamFormProps> = ({ team }) => {
    const [teamForm, setTeamForm] = useState<any>();
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();

    useEffect(() => {
        //if url includes "nuevo" the stored team is removed so the form is empty
        //otherwise the stored team recieved as prop is used to fill the form 
        if (location.pathname.includes("nuevo")) localStorage.removeItem("team");
        else setTeamForm(team);
    }, [team]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTeamForm({ ...teamForm, [event.target.name]: event.target.value });
    };

    const handlePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) setTeamForm({ ...teamForm, team_shield: event.target.files[0] });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();

        //if editing and picture is a string it means it was not changed so it is deleted from the form
        //if it was changed teamForm.team_shield should be a file
        if (team && (teamForm.team_shield === null || typeof teamForm.team_shield === "string")) delete teamForm.team_shield;
        for (const key in teamForm) formData.append(key, teamForm[key]);
        const response = await fetch(team ? `http://localhost:8000/api/teams/${team.id}/` :
            "http://localhost:8000/api/teams/", {
            method: team ? "PUT" : "POST",
            body: formData,
        });
        try {
            const teamResp = await response.json();
            navigate(`/equipos/${teamResp.id}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                label="Nombre"
                name="name"
                value={teamForm?.name}
                onChange={handleChange}
                required
            />
            <TextField
                label="País"
                name="country"
                value={teamForm?.country}
                onChange={handleChange}
                required
            />
            <div>
                <Button variant="contained" component="label">
                    Foto
                    <input
                        hidden
                        accept="image/*"
                        type="file"
                        name="team_shield"
                        onChange={handlePicture}
                    />
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Guardar
                </Button>
            </div>
        </form>
    )
};

export default TeamForm;