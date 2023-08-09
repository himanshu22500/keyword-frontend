import { useState } from "react";
import youtubeLogo from "./assets/youtube.svg";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchVolume, setSearchVolume] = useState(0);

  const handleClick = async () => {
    setLoading(true);
    await fetchData(keyword);
    setLoading(false)
  };

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const fetchData = async (value) => {
    const url =
      "https://himanshu-keyword-search.onrender.com/getTotalViewCount?searchKeyword=" +
      value;

    console.log(url);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSearchVolume(data.totalViewCount);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const renderSearchVolume = () => {
    if (loading) return "Loading";
    else return searchVolume;
  };

  return (
    <>
      <div>
        <a href="https://youtube.com" target="_blank">
          <img src={youtubeLogo} className="logo" alt="Vite logo" />
        </a>
      </div>

      <h1>Keyword Volume Search</h1>

      <div className="card">
        <input placeholder="Enter your Keyword" onChange={handleChange}></input>
        <div>
          <button onClick={handleClick}>Get Keyword Volume</button>
        </div>
        <div>
          <p className="search-result">{renderSearchVolume()}</p>
        </div>
      </div>
    </>
  );
}

export default App;
