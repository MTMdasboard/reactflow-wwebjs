import React, { useState, useEffect } from "react";
import LayoutFlow from "./components/layouts/LayoutFlow";
import "reactflow/dist/style.css";
import "./App.css";

const useData = (url) => {
  const [state, setState] = useState();
  useEffect(() => {
    const dataFetch = async () => {
      try {
        const responce = await fetch(url);
        if (responce.ok) {
          const data = await responce.json();
          if (data) {
            setState(data);
            return;
          }
        }
      } catch (error) {}
      setState({});
    };
    dataFetch();
  }, [url]);
  return { state };
};

const App = () => {
  
  const { state } = useData(import.meta.env.VITE_SERVER_URL + "/flow/load");

  if (!state) return "Загрузка";

  return (
    <div style={{ height: "100%" }}>
      <LayoutFlow data={state} />
    </div>
  );
};

export default App;
