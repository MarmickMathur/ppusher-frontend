import { useState, useEffect } from "react";

const DropDown = ({ options, selected, label, onSelectedChange }) => {
  const [open, setopen] = useState(false);
  const [dis, setdis] = useState("none");
  const [ops, setops] = useState([]);

  useEffect(() => {
    let temp = options.map((option) => {
      if (selected.includes(option)) {
        return (
          <div
            key={option.value}
            style={{ color: "red" }}
            onClick={() => changeops(option)}
            className="item"
          >
            {option.label}
          </div>
        );
      }
      return (
        <div
          key={option.value}
          onClick={() => changeops(option)}
          className="item"
        >
          {option.label}
        </div>
      );
    });
    setops(temp);
  }, [selected]);

  useEffect(() => {
    if (open) setdis("block");
    else {
      setdis("none");
    }
  }, [open]);

  const changeops = (e) => {
    let temp = [];
    let flg = 0;
    for (let i = 0; i < selected.length; i++) {
      if (selected[i] == e) {
        flg = 1;
        continue;
      }
      temp.push(selected[i]);
    }
    if (flg == 0) {
      temp.push(e);
    }
    onSelectedChange(temp);
  };

  return (
    <div className="ui form">
      <div className="field">
        <label
          onClick={(e) => {
            setopen(!open);
          }}
          className="label"
        >
          {label}
        </label>
        <div style={{ display: dis }}>{ops}</div>
      </div>
    </div>
  );
};

export default DropDown;
