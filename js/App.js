function App(){
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

    const [board, setBoard] = React.useState(["", "", "", "", "", "", "", "", ""])
    
    let gameOver = false;
    const [turn, setTurn] = React.useState('X')
    let win;

    function handleTurn(event) {
        let idx = event.target.id
        if (gameOver == false) {
            let newBoard = [...board]
            newBoard[idx] = turn
            setBoard(newBoard)
            let nextTurn = turn === 'X' ? 'O' : 'X'
            setTurn(nextTurn)
            win = getWinner()
        }
        // win = getWinner();
        // render();
    };

    return (
        <div>
            <h1>Tic-Tac-Toe</h1>

            <h2>It's {turn}'s turn!</h2>

                <div class="flex-container flex-column">
                    <div class="flex-container flex-wrap" id="board" onClick ={handleTurn}>
                        {board.map((value, idx) => {
                            return (
                                <div class ="square" key ={idx} id={idx}>
                                    {value}
                                </div>
                            )
                        })}
                    </div>
                    <button id="reset-button">reset</button>
                </div>
        </div>
    )
}

ReactDOM.render(<App />, root)