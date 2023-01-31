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

type Props = {
    player: Player | null;
    teams: Team[];
};

export default function PlayerForm({ player, teams }: Props) {
    const [playerForm, setPlayerForm] = useState<any>();
    const [selectedFoot, setSelectedFoot] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();

    useEffect(() => {
        //if url includes "nuevo" the stored player is removed so the form is empty
        //otherwise the stored player recieved as prop is used to fill the form 
        if(location.pathname.includes("nuevo")) localStorage.removeItem("player");
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
        if (event.target.files) setPlayerForm({ ...playerForm, picture: event.target.files[0] });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData();
        event.preventDefault();
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
        //if editing and picture is a string it means it was not changed so it is deleted from the form
        //if it was changed playerForm.picture should be a file
        if(player && (playerForm.picture === null || typeof playerForm.picture === "string")) delete playerForm.picture;
        //if editing and there is teamForm.name it means it was not changed so it is deleted from the form
        //if it was changed playerForm.team should be a number
        if(player && playerForm.team && playerForm.team.name) delete playerForm.team;
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
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                label="Nombre"
                name="name"
                value={playerForm?.name}
                onChange={handleChange}
                required
            />
            <TextField
                select
                id="team-select"
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
            <TextField
                label="Número de camiseta"
                type="number"
                name="shirt_number"
                value={playerForm?.shirt_number}
                onChange={handleChange}
                required
            />
            <TextField
                label="Posición"
                name="position"
                value={playerForm?.position}
                onChange={handleChange}
            />
            <TextField
                label="Altura"
                type="number"
                name="height"
                value={playerForm?.height}
                onChange={handleChange}
                required
            />
            <TextField
                label="Peso"
                type="number"
                name="weight"
                value={playerForm?.weight}
                onChange={handleChange}
                required
            />
            <TextField
                label="Fecha de nacimiento"
                type="date"
                name="birth_date"
                value={playerForm?.birth_date}
                onChange={handleChange}
                required
            />
            <TextField
            select
                label="Pie dominante"
                name="foot"
                value={selectedFoot}
                onChange={handleFootSelect}
                required
            >
                <MenuItem value="right">Derecho</MenuItem>
                <MenuItem value="left">Izquierdo</MenuItem>
                <MenuItem value="both">Ambos</MenuItem>
            </TextField>
            <div>
                <Button variant="contained" component="label">
                    Foto
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
        </form>
    );
}