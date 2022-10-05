import React, { useEffect, useState } from "react";
import "./App.css";

function create2dArray(n, m) {
  return new Array(n).fill().map((_) => new Array(m).fill(false));
}

function App() {
  // 15 x 20
  const [grid, setGrid] = useState(create2dArray(15, 20));
  const [IsActivated, setIsActivate] = useState(false);

  const onClick = (r, c) => {
    const list = [...grid];
    if (IsActivated) {
      list[r][c] = IsActivated;
      setGrid(list);
    }
  };
  console.log("hello", grid);

  const handlesClear = () => {
    setGrid(create2dArray(15, 20));
    if (IsActivated) {
      setIsActivate((e) => !e);
    }
  };
  const handlesClick = () => {
    setIsActivate((e) => !e);
  };
  const color = {
    color: IsActivated ? "White" : "",
    background: IsActivated ? "Black" : "",
  };
  return (
    <div>
      <table className="foo">
        <tbody>
          {grid.map((row, r) => (
            <tr key={r}>
              {row.map((column, c) => (
                <td
                  key={c}
                  onClick={() => onClick(r, c)}
                  style={{ backgroundColor: column ? "black" : "white" }}
                >
                  {column}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlesClick} style={color}>
          Button
        </button>
      </div>
      <div>
        <button onClick={handlesClear}>Clear</button>
      </div>
    </div>
  );
}

export default App;
