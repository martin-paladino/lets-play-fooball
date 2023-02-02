import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import { TextField, Button, MenuItem, Theme, FormControl, Typography } from "@mui/material"
import { Player, PlayerPayload, Team } from "../../types";
import { SelectChangeEvent } from "@mui/material/Select";
import { useLocation, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
    buttons: {
        display: "flex",
        margin: theme.spacing(2),
        justifyContent: "space-around"
    },
    form: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        padding: 20
    }
}));

interface TeamFormProps {
    team: Team | null;
}

const TeamForm: React.FC<TeamFormProps> = ({ team }) => {
    const [teamForm, setTeamForm] = useState<any>();
    const [pictureName, setPictureName] = useState<string>("");
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
        if (event.target.files) {
            setTeamForm({ ...teamForm, team_shield: event.target.files[0] });
            setPictureName(event.target.files[0].name);
        };
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
        <div className={classes.form}>
        <form onSubmit={handleSubmit}>
        <FormControl margin="normal" fullWidth>
            <TextField
                label="Nombre"
                name="name"
                InputLabelProps={{ shrink: true }}
                value={teamForm?.name}
                onChange={handleChange}
                required
            />
            </FormControl>
            <FormControl margin="normal" fullWidth>
            <TextField
                label="País"
                name="country"
                InputLabelProps={{ shrink: true }}
                value={teamForm?.country}
                onChange={handleChange}
                required
            />
            </FormControl>
            <div className={classes.buttons}>
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
            {pictureName && <Typography variant="subtitle2" style={{ color: "blue" }}>{pictureName}</Typography>}
        </form>
        </div>
    )
};

export default TeamForm;