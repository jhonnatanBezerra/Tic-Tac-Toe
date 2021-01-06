import React, { useState, useEffect } from 'react'
import './styles.css'

export default function TicTacToe() {

  const emptyBoard = Array(9).fill("");

  const [board, setBoard] = useState(emptyBoard);
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);


  useEffect(() => {
    checkWinner()
  }, [board]);

  /*
  function handleClick(e){
    setBoard(board.map((item, index) => index === e ? "O" : item));
  }
   FUNÇÃO ANONIMA ABAIXO , MESMO SENTIDO DESSA FUNCÃO AQUI, POREM ESSA CHAMA APENAS FUNÇÃO
  */

  const handleClick = (e) => {
    if (winner) return null;

    if (board[e] !== "") return null;

    setBoard(board.map((item, index) => index === e ? player : item));

    setPlayer(player === "X" ? "O" : "X");
  }

  const checkWinner = () => {
    const possibleToWin = [
      //possiveis ganhadores da horizoltal
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      //possivel ganhadores da vertical
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      //possiveis ganhadores da diagonais
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ]

    possibleToWin.forEach(possibles => {
      if (possibles.every(possible => possible === "O")) setWinner("O");

      if (possibles.every(possible => possible === "X")) setWinner("X");
    });
    checkDraw();
  }

  const checkDraw = () => {
    if (board.every(possible => possible !== "")) {
      setWinner('E');
    }
  }

  const resetGame = () => {
    setPlayer(winner !== "E" ? winner : "X");
    setBoard(emptyBoard);
    setWinner(null);
  }

  return (
    <main>
      <h1 className="title">Jogo da Velha</h1>
      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((item, index) => (
          // className={`cell ${item}`} => PASSANDO UM NOVO ATRIBUTO PARA A CLASSE PARA PODER MUDAR AS CORES NO CSS
          <div className={`cell ${item} `} onClick={() => handleClick(index)} key={index}>
            {item}
          </div>
        ))}
      </div>

      {/* regra para definir quando o footer ira aparecer
      ou seja so vai aparecer quando winner for diferente de undefinid */}
      {winner &&
        <footer>
          {winner === "E" ?
            <h2 className="winner-message">
              <span className={winner}>Empate!</span>
            </h2>

            :

            <h2 className="winner-message">
              <span className={winner}>{winner}</span> Ganhou!
            </h2>
          }

          <button onClick={resetGame}>Recomeçar</button>
        </footer>
      }
    </main>
  )
}

