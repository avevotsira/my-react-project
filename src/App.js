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
import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [students, setStudents] = useState([
    { name: "Default", age: "5" },
    { name: "Default2", age: "5" },
  ]);
  // for (let i = 0; i < students.length; i++) {
  //   setAvgAge(avgAge + students.age);
  // }

  const onAddClicked = () => {
    setStudents([...students, { name, age }]);

    setName("");
    setAge("");
  };
  // const deleteTableRows = (students) => {
  //   setStudents(students.filter((_, index) => index !==));
  // };
  let average = 0;
  for (let i = 0; i < students.length; i++) {
    average += Number(students[i].age);
  }

  const handlesDeleteClick = (studentId) => {
    const newStudents = [...students];
    const index = students.findIndex((student) => student.name === studentId);

    newStudents.splice(index, 1);
    setStudents(newStudents);
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
      />
      <input
        type="text"
        value={age}
        onChange={(e) => {
          setAge(e.currentTarget.value);
        }}
      />
      <button onClick={onAddClicked}>Add</button>

      <table className="foo">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.name}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <button onClick={() => handlesDeleteClick(student.name)}>
                Delete
              </button>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Average Age</td>
            <td>{average / students.length}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
