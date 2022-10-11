import React, { useState } from "react";
import "./App.css";

function create2dArray(n, m) {
  return new Array(n).fill().map((_) => new Array(m).fill(false));
}

function App() {
  // 15 x 20

  const [IsActivated, SetIsActivate] = useState(false);
  const [IsSrc, SetIsSrc] = useState(false);
  const [IsDsc, SetIsDsc] = useState(false);
  const [IsFindPath, SetIsFindPath] = useState(false);

  const [grid, setGrid] = useState(create2dArray(15, 20));
  const [color, setColor] = useState("");
  const [isSource, setIsSource] = useState(false);
  const [isDestination, setIsDestination] = useState(false);

  const onClick = (r, c) => {
    const list = [...grid];
    console.log("Row" + r, "Column:" + c);
    console.log(list[14][19]);
    console.log(list);
    const box = list[r][c];
    if (!box && color) {
      list[r][c] = color;
      setGrid(list);

      if (color === "red") {
        setIsSource(true);
        if (isDestination) {
          SetIsFindPath(true);
        }
      }
      if (color === "blue") {
        setIsDestination(true);
        if (isSource) {
          SetIsFindPath(true);
        }
      }

      color !== "black" && setColor("");
    }
  };
  const find2d = (grid, item) => {
    let ix = 0,
      col = -1;
    while (ix < grid.length && (col = grid[ix].indexOf(item)) === -1) ix++;
    return ix === grid.length ? undefined : [ix, col];
  };

  const handlesClear = () => {
    setGrid(create2dArray(15, 20));
    if (IsActivated || IsSrc || IsDsc) {
      SetIsActivate(false);
      SetIsSrc(false);
      SetIsDsc(false);
      setIsDestination(false);
      setIsSource(false);
      SetIsFindPath(false);
    }
  };
  const handlesWall = () => {
    SetIsActivate((e) => !e);
    if (IsSrc || IsDsc) {
      SetIsDsc(false);
      SetIsSrc(false);
    }
  };
  const handlesSrc = () => {
    SetIsSrc((e) => !e);
    if (IsDsc || IsActivated) {
      SetIsActivate(false);
      SetIsDsc(false);
    }
  };
  const handlesDsc = () => {
    SetIsDsc((e) => !e);

    if (IsSrc || IsActivated) {
      SetIsActivate(false);
      SetIsSrc(false);
    }
  };

  const HandleFindpath = () => {
    let list = [...grid];
    let src = find2d(list, "red");
    let r = src[0];
    let c = src[1];
    //let dst = find2d(list, "blue");

    function move(r, c) {
      if (list[r][c] === "blue") {
        console.log("SRC to Dst is Possible");
        alert("The Src => Dst is possible");
      } else if (list[r][c] !== "black" && list[r][c] !== "v") {
        console.log("Valid position at colum:", c, "row", r);
        list[r][c] = "v";
      }

      //list[r].length is 20
      if (c < list[r].length - 1) {
        move(r, c + 1);
      }
      //list.length is 15
      if (r < list.length - 1) {
        move(r + 1, c);
      }

      if (r === 14 && list[r - 1][c] !== "v") {
        move(r - 1, c);
      }
      if (c === 19 && list[r][c - 1] !== "v") {
        move(r, c - 1);
      }
    }
    move(r, c);
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
                  style={{ backgroundColor: column || "white" }}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => {
            setColor("black");
            handlesWall();
          }}
          style={{
            color: IsActivated ? "White" : "",
            background: IsActivated ? "Black" : "",
          }}
        >
          Wall
        </button>
        <button onClick={handlesClear}>Clear</button>
        {!isSource && (
          <button
            onClick={() => {
              setColor("red");
              handlesSrc();
            }}
            style={{
              color: IsSrc ? "White" : "",
              background: IsSrc ? "Black" : "",
            }}
          >
            Src
          </button>
        )}
        {!isDestination && (
          <button
            onClick={() => {
              setColor("blue");
              handlesDsc();
            }}
            style={{
              color: IsDsc ? "White" : "",
              background: IsDsc ? "Black" : "",
            }}
          >
            Dst
          </button>
        )}
        {IsFindPath && <button onClick={HandleFindpath}>Find Path</button>}
      </div>
    </div>
  );
}

export default App;
