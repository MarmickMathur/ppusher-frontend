import { useState, useEffect } from "react";

const AutocompleteSearch = ({ oninputchange, ind }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState("");
  console.log(0);

  useEffect(() => {
    oninputchange(inputValue);
  }, [inputValue]);

  const handleChange = async (event) => {
    const value = event.target.value;
    setInputValue(value);
    // Fetch suggestions from the server only if input value is not empty
    if (value.trim() !== "") {
      console.log("value is", value);
      fetchSuggestions(value);
    } else {
      // Clear suggestions when input value is empty
      setSuggestions("");
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      console.log("query is ", query);
      const response = await fetch(
        `https://ppushermusicsuggestion.onrender.com/tags?query=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }
      const data = await response.json();
      console.log(data);
      setSuggestions(data[0].split(" ")[ind]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions("");
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search..."
      />
      {suggestions && (
        <div onClick={() => handleSuggestionClick(suggestions)}>
          {suggestions}
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearch;
