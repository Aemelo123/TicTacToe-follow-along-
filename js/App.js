function App() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const [board, setBoard] = React.useState(["", "", "", "", "", "", "", "", ""]);
    const [turn, setTurn] = React.useState('X');
    const [win, setWin] = React.useState(null);
    const [gameOver, setGameOver] = React.useState(false);

    React.useEffect(() => {
        let whoWon = getWinner(board);
        if (whoWon) {
            setWin(whoWon);
            setGameOver(true);
        } else {
            let isBoardFull = !board.includes('');
            if (isBoardFull) {
                setWin('T');
                setGameOver(true);
            } else {
                setTurn(prevTurn => (prevTurn === 'X' ? 'O' : 'X'));
            }
        }
    }, [board, gameOver]);

    function getWinner() {
        for (let i = 0; i < winningCombos.length; i++) {
            const [a, b, c] = winningCombos[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // Return the winner (either 'X' or 'O')
            }
        }

        // Check for a tie
        if (!board.includes('')) {
            return 'T'; // It's a tie
        }

        // No winner yet
        return null;
    }

    function handleTurn(event) {
        let idx = event.target.id;
        if (!gameOver && !board[idx]) {
            setBoard(prevBoard => {
                let newBoard = [...prevBoard];
                newBoard[idx] = turn;
                return newBoard;
            });
        }
    }

    function Message() {
        let message = win === 'T' ? 'That\'s a tie' : win ? `${win} wins the game!` : `It's ${turn}'s turn!`;

        return <h2>{message}</h2>;
    }

    function resetGame() {
        setBoard(["", "", "", "", "", "", "", "", ""]);
        setTurn('X');
        setWin(null);
        setGameOver(false);
    }


    return (
        <div>
            <h1>Tic-Tac-Toe</h1>

            <Message />
            <div className="flex-container flex-column">
                <div className="flex-container flex-wrap" id="board" onClick={handleTurn}>
                    {board.map((value, idx) => (
                        <div className="square" key={idx} id={idx}>
                            {value}
                        </div>
                    ))}
                </div>
                <button id="reset-button" onClick={resetGame}>Reset</button>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, root);
