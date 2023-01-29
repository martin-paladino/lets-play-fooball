import { useEffect } from "react";
import { Player, Team } from "../../types";
import Card from "./card";

interface CardListProps {
    list: Team[] | Player[];
}

const CardsList: React.FC<CardListProps> = ({ list }) => {

    return (
        <>
            {list.map((elem: Team | Player, index: number) => (
                <Card key={index} elem={elem}/>
            ))}
        </>
    );
};

export default CardsList;