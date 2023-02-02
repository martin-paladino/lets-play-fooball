export type Team = {
    id?: number;
    name: string;
    team_shield: string;
    number_of_players?: number;
    average_age?: number;
    country: string;
    players?: Player[];
}

export type Player = {
    id?: number;
    name: string;
    picture?: string;
    team?: Team;
    shirt_number: number;
    position: string;
    height: number;
    weight: number;
    birth_date: string;
    age: number;
    foot: string;
}

export type PlayerPayload = {
    name: string;
    picture?: string;
    team_id?: number;
    shirt_number: number;
    position: string;
    height: number;
    weight: number;
    birth_date: string;
    foot: string;
}