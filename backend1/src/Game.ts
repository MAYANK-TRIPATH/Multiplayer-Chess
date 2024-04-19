import { WebSocket } from "ws";
import { Chess } from 'chess.js';
import { GAME_OVER, MOVE, INIT_GAME } from './messages';

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess;
    private startTime: Date;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white" // Corrected the color assignment
            }
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black" // Corrected the color assignment
            }
        }));
    }

    makeMove(socket: WebSocket, move: {
        from: string;
        to: string;
    }) {
        // Validate the type of move using Zod
        if ((this.board.turn() === 'w' && socket !== this.player1) ||
            (this.board.turn() === 'b' && socket !== this.player2)) {
            return;
        }

        try {
            this.board.move(move);
        } catch (e) {
            console.log(e);
            return;
        }

        const winner = this.board.in_checkmate() ? (this.board.turn() === 'w' ? 'black' : 'white') : null;

        // Send the move message to the other player
        if (this.board.turn() === 'w') {
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        } else {
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        }

        if (winner) {
            // Send the game over message to both players
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: { winner }
            }));
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload: { winner }
            }));
        }
    }
}

