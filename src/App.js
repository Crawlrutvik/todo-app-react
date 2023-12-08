import "./App.css";
import React, { useState } from "react";
import deleticon from "../src/Assets/img/delete_icon.png";
import editicon from "../src/Assets/img/edit_icon.png";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [indexNum, setIndexNum] = useState(null);
  const [Data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  console.log('checkedItems: ', checkedItems);

  const heandelSubmit = (event) => {
    event.preventDefault();
    if (typeof indexNum === "number" && indexNum >= 0) {
      setData((prevData) => {
        const newData = [...prevData];
        newData[indexNum] = inputValue;
        return newData;
      });
      setIndexNum(null);
    } else {
      setData((prevData) => [...prevData, inputValue]);
    }
    setInputValue("");
  };
  const getText = (e) => {
    setInputValue(e?.target?.value.trimStart());
  };
  const deleteItem = (index) => {
    const deleteData = Data?.filter((item, Currentindex) => {
      return Currentindex !== index;
    });
    setData(deleteData);
  };
  const editItem = (index) => {
    const editData = Data?.filter((item, Currentindex) => {
      return Currentindex === index;
    });
    setInputValue(editData[0]);
    setIndexNum(index);
  };

  const checkItem = (index) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = [...prevCheckedItems];
      console.log('newCheckedItems: ', newCheckedItems);
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };

  return (
    <>
      <div className="title">
        <h1>To Do List</h1>
      </div>
      <div className="main_wrap">
        <progress value={inputValue?.length} max={100} />

        <form onSubmit={heandelSubmit}>
          <input type="text" onChange={getText} value={inputValue} />
          <button disabled={inputValue?.length > 0 ? false : true}>
            submit
          </button>
        </form>
        {Data?.length > 0 ? (
          <ul className="task-list">
            {Data.map((item, index) => (
              <li
                key={index}
                className={`task-list-item ${
                  checkedItems[index] ? "done-task-list-item" : ""
                } `}
              >
                {item}
                <div>
                  <input
                    type="checkbox"
                    onChange={() => checkItem(index)}
                    checked={checkedItems[index] || false}
                    name={`checkbox${index}`}
                  />
                  <span onClick={() => deleteItem(index)}>
                    <img src={deleticon} alt="delete icon" />
                  </span>
                  <span onClick={() => editItem(index)}>
                    <img src={editicon} alt="edit icon" />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="title">
            <h3>plz add your to do </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
