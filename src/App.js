import React, { Component } from "react";
import logo from "./restriction.png";
import "./App.css";
import SMSForm from "./SMSForm";
import RelationForm from "./components/RelationForm";
import { Configuration, OpenAIApi } from "openai";
import { useState, useEffect } from "react";

export default function App() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPEN_AI_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const [option, setOption] = useState({});
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [relationData, setRelationData] = useState("");

  const updateRelation = (relation) => {
    setRelationData(relation);
  };

  const doStuff = async () => {
    // let object = { ...option, prompt: input };
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Please write me a hilarious short text with a dark undertone about how I can't talk right right now to my${relationData}`,
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    setResult(response.data.choices[0].text);
  };

  useEffect(() => {
    console.log(result)
  }, [result]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <RelationForm updateRelation={updateRelation} doStuff={doStuff} result={result}/>
        <SMSForm doStuff={doStuff} result={result} updateRelation={updateRelation}/>
        <div>
          <p>{relationData}</p>
        </div>
      </header>
    </div>
  );
}
