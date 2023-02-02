import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import { FormControl, InputLabel, TextField, Button, MenuItem, Theme, Typography, } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { Player, PlayerPayload, Team } from "../../types";
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

interface PlayerFormProps {
    player: Player | null;
    teams: Team[];
    teamId?: number;
};

export default function PlayerForm({ player, teams, teamId }: PlayerFormProps) {
    const [playerForm, setPlayerForm] = useState<any>();
    const [selectedFoot, setSelectedFoot] = useState("");
    const [pictureName, setPictureName] = useState<string>("");
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();

    useEffect(() => {
        //if url includes "nuevo" the stored player is removed so the form is empty
        //otherwise the stored player recieved as prop is used to fill the form 
        if (location.pathname.includes("nuevo")) localStorage.removeItem("player");
        else setPlayerForm(player);

        if (player) setSelectedFoot(player.foot);
    }, [player]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerForm({ ...playerForm, [event.target.name]: event.target.value });
    };

    const handleTeamSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedTeam = teams.find(team => team.id === parseInt(event.target.value));
        setPlayerForm({ ...playerForm, team_id: selectedTeam?.id ? selectedTeam.id : null });
    };

    const handleFootSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFoot(event.target.value);
        setPlayerForm({ ...playerForm, foot: event.target.value });
    };

    const handlePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setPlayerForm({ ...playerForm, picture: event.target.files[0] })
            setPictureName(event.target.files[0].name);
        };
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        setPlayerForm({
            name: "",
            team: "",
            shirt_number: "",
            position: "",
            picture: "",
            height: "",
            weight: "",
            birth_date: "",
            foot: "",
        });
        console.log("playerForm", playerForm);

        //if editing and picture is a string it means it was not changed so it is deleted from the form
        //if it was changed playerForm.picture should be a file
        if (player && (playerForm.picture === null || typeof playerForm.picture === "string")) delete playerForm.picture;
        //if editing and there is teamForm.name it means it was not changed so it is deleted from the form
        //if it was changed playerForm.team should be a number
        if (player && playerForm.team && playerForm.team.name) delete playerForm.team;
        for (let key in playerForm) formData.append(key, playerForm[key]);

        const response = await fetch(player ? `http://localhost:8000/api/players/${player.id}/` :
            "http://localhost:8000/api/players/", {
            method: player ? "PUT" : "POST",
            body: formData,
        });
        try {
            const playeResp = await response.json();
            navigate(`/jugadores/${playeResp.id}`)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={classes.form}>
            {playerForm && 
            <form onSubmit={handleSubmit}>
                <FormControl margin="normal" fullWidth>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        name="name"
                        label="Nombre"
                        type="text"
                        value={playerForm?.name}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <TextField
                        select
                        InputLabelProps={{ shrink: true }}
                        label="Equipo"
                        type="select"
                        name="team"
                        value={playerForm?.team?.id}
                        onChange={handleTeamSelect}
                    >
                        {teams.map((team) => (
                            <MenuItem key={team.id} value={team.id}>
                                {team.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        type="number"
                        label="Número de camiseta"
                        name="shirt_number"
                        value={playerForm?.shirt_number}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        name="position"
                        label="Posición"
                        type="text"
                        value={playerForm?.position}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        type="number"
                        label="Altura"
                        inputProps={{
                            step: '0.01',
                        }}
                        name="height"
                        value={playerForm?.height}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        type="number"
                        label="Peso"
                        inputProps={{
                            step: '0.01',
                        }}
                        name="weight"
                        value={playerForm?.weight}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        label="Fecha de nacimiento"
                        type="date"
                        name="birth_date"
                        value={playerForm?.birth_date}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <TextField
                        select
                        label="Pie Dominante"
                        name="foot"
                        value={selectedFoot}
                        onChange={handleFootSelect}
                        required
                    >
                        <MenuItem value="right">Derecho</MenuItem>
                        <MenuItem value="left">Izquierdo</MenuItem>
                        <MenuItem value="both">Ambos</MenuItem>
                    </TextField>
                </FormControl>
                <div className={classes.buttons}>
                    <Button variant="contained" component="label">
                        <AddIcon fontSize="small" />Foto
                        <input
                            hidden
                            accept="image/*"
                            type="file"
                            name="picture"
                            onChange={handlePicture}
                        />
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Guardar
                    </Button>
                </div>
                    {pictureName && <Typography variant="subtitle2" style={{ color: "blue" }}>{pictureName}</Typography>}
            </form>}
        </div>
    );
}