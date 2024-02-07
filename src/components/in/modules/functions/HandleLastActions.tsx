import React from "react";

type Props = {
    list: string[];
    setPlayer: React.Dispatch<React.SetStateAction<{ cords: number[]; direction: string | undefined; }>>;
    selectedMap: {
        ruleset: {
            control: string[];
            color: string[];
            functions: {
                name: string;
                args: number;
            }[];
        };
        player: {
            spawn: number[];
            direction: string;
        };
        board: {
            cord: number[];
            color: string;
            required?: true | undefined;
        }[];
    };
    player: {
        cords: number[];
        direction: string | undefined;
    };
    movePlayer: (x: number, y: number) => void;
    turnPlayer: (direction: string) => void;
};

const handleLastAction = ({list, player, setPlayer, selectedMap, movePlayer, turnPlayer}: Props): void => {
    const lastAction = list[list.length - 1];

    const turnOrMovePlayer = (direction: string | undefined) => {
        if (direction !== undefined) {
            // console.log(lastAction, x, y)
            if ((!!lastAction.split("-") && lastAction.split("-")[1] === "forward") || lastAction === "forward") {
                if (player.direction === 'up') {
                    movePlayer(0, -1);
                } else if (player.direction === 'down') {
                    movePlayer(0, 1);
                } else if (player.direction === 'left') {
                    movePlayer(-1, 0);
                } else if (player.direction === 'right') {
                    movePlayer(1, 0);
                }
            } else {
                turnPlayer(lastAction);
            }
        }
    };

    switch (lastAction) {
        case "left":
            turnOrMovePlayer("left");
            break;
        case "right":
            turnOrMovePlayer("right");
            break;
        case "forward":
            turnOrMovePlayer(player.direction);
            break;
        default:
            break;
    }

    if (list.length === 0) {
        const [cords, direction] = [selectedMap.player.spawn, selectedMap.player.direction];
        setPlayer({ cords, direction });
    } else if (lastAction.includes("-")) {
        const color = lastAction.split("-")[0];
        const matchingColorLocation: any = selectedMap.board.find((select: any) =>
            select.cord[0] === player.cords[0] && select.cord[1] === player.cords[1] && select.color === color);
        if (!!matchingColorLocation) {
            const action = lastAction.split("-")[1];
            if (action.includes("forward")) {
                turnOrMovePlayer(player.direction);
            } else {
                turnOrMovePlayer(player.direction);
            }
        }
    }
};

export default handleLastAction;