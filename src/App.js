// import "./App.css";
// import { useState } from "react";

// function Spoiler({ text }: { text: string }) {
//   return <span>{text}</span>;
// }

// function App() {
//   const [count, setCount] = useState(0);
//   const onHitMeClicked = () => {
//     setCount(count + 1);
//   };

//   return (
//     <div>
//       <p style={{ color: count > 10 ? "red" : "black" }}>
//         You have hit me {count} time
//       </p>
//       <div>
//         <button onClick={onHitMeClicked}>Hit me</button>
//       </div>
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import "./App.css";
const Choice = ["Rock", "Paper", "Scissor"];
function App() {
  // const [UserChoice, SetUserChoice] = useState("");
  // const [PcChoice, SetPcChoice] = useState("");
  // let UserWinCount = 0;
  // let PCWinCount = 0;
  // let Winner = "";
  // const Choice = ["Rock", "Scissor", "Paper"];
  // const PcChoiceRandom = Choice[Math.floor(Math.random() * Choice.length)];
  // const HandleClick = (Action) => {
  //   SetUserChoice(Action);
  //   SetPcChoice(PcChoiceRandom);
  // };
  // console.log(UserChoice, PcChoice);
  // console.log(UserChoice === "Rock" && PcChoice === "Paper");
  // if (UserChoice === "Rock" && PcChoice === "Paper") {
  //   Winner = "PC";
  //   PCWinCount++;
  // } else if (UserChoice === "Rock" && PcChoice === "Scissor") {
  //   Winner = "User";
  //   UserWinCount++;
  // } else if (UserChoice === "Rock" && PcChoice === "Rock") {
  //   Winner = "Draw";
  // } else {
  // }
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [result, setResult] = useState("");
  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);

  const onPlayerClick = (option) => {
    setPlayer1(option);
  };

  const onPlayAgain = () => {
    setPlayer1("");
    setPlayer2("");
    setResult("");
  };

  useEffect(() => {
    if (!!player1) {
      setPlayer2(Choice[Math.floor(Math.random() * Choice.length)]);
    }
  }, [player1]);

  useEffect(() => {
    if (player1 && player2) {
      const p1 = Choice.indexOf(player1);
      const p2 = Choice.indexOf(player2);
      if (p1 === p2) {
        setResult("Draw");
      } else if ((p1 === 0 && p2 === 2) || (p1 === 2 && p2 === 0)) {
        const isPlayer1Win = p1 === 0 && p2 === 2;
        setResult(isPlayer1Win ? "Player 1 win" : "Player 2 win");
        if (isPlayer1Win) {
          setScorePlayer1((s) => s + 1);
        } else {
          setScorePlayer2((s) => s + 1);
        }
      } else if (p1 > p2) {
        setResult("Player 1 win");
        setScorePlayer1((s) => s + 1);
      } else {
        setResult("Player 2 win");
        setScorePlayer2((s) => s + 1);
      }
    }
  }, [player1, player2]);
  useEffect(() => {
    console.log("test");
  }, []);
  return (
    <div className="center">
      <h1>Rock Paper Scissor</h1>
      <div className="container">
        <div>
          <h3>{!player1 ? "Player 1 turn" : "Computer turn"}</h3>
        </div>
        <div style={{ display: "flex" }}>
          <h4>Player 1 : {scorePlayer1}</h4>
          <h4>Player 2 : {scorePlayer2}</h4>
        </div>
        <div>
          <h3>{result}</h3>
        </div>
        <div style={{ display: "flex" }}>
          <div>
            <h4>Player 1 choose : {player1}</h4>
          </div>
          <div>
            <h4>Player 2 choose : {player2}</h4>
          </div>
        </div>
        <div>
          <button onClick={() => onPlayerClick("Rock")}>Rock</button>
          <button onClick={() => onPlayerClick("Scissor")}>Scissor</button>
          <button onClick={() => onPlayerClick("Paper")}>Paper</button>
        </div>
        <button onClick={onPlayAgain}>Play Again</button>
        {/* <div>
          <div className="player">Player 1 :{UserWinCount}</div>
        </div>
        <div>
          <div className="player">Player 2 :{PCWinCount}</div>
        </div> */}
      </div>
      {/* <div>
        <button onClick={() => console.log("test")}>Rock</button>
        <button onClick={() => HandleClick("Scissor")}>Scissor</button>
        <button onClick={() => HandleClick("Paper")}>Paper</button>
      </div>
      <div>Player 1 Choose {UserChoice}</div>
      <div>Player 2 Choose {PcChoice}</div>

      <div>Winner is {Winner}</div> */}
    </div>
  );
}

export default App;
