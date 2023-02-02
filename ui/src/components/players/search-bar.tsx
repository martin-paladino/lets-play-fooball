import { TextField } from '@mui/material';
import { useState } from 'react';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <TextField
                label="Buscar jugador por nombre"
                value={searchTerm}
                onChange={handleChange}
                margin="normal"
                fullWidth
            />
    )
};

export default SearchBar;