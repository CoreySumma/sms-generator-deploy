import React from "react";
import logo from "../../assets/restriction.png";
import "./App.css";
import SMSForm from "../../components/SMSForm/SMSForm";
import RelationForm from "../../components/RelationForm/RelationForm";
import { Configuration, OpenAIApi } from "openai";
import { useState, useEffect } from "react";

export default function App() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPEN_AI_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const [result, setResult] = useState("");
  const [relationData, setRelationData] = useState("");

  const updateRelation = (relation) => {
    setRelationData(relation);
  };

  const doStuff = async () => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Without using quotation marks please write me a custom short text message to my ${relationData} that is funny, with a lot of dark humor and sarcasm, that explains that I am busy. Please add in something about how I need to call them later after I am done doing something completely unrealistic. The last sentence should be a true fact about something completely random that has nothing to do with anything. Depending on the person I am asking you to send it to, please tailor it to them! Each time I ask you to write me a text, please produce something you have not said before.`,
      temperature: 0.5,
      max_tokens: 100,
      temperature: 0.9,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    setResult(response.data.choices[0].text.trim());
    console.log("this is doStuff result --->", result);
  };

  useEffect(() => {
    console.log("this is useEffect result --->", result);
  }, [result]);

  return (
    <div className="App">
      <header className="App-header">
        <a href="https://coreysumma.github.io/portfolioweb/">
          <img src={logo} className="App-logo" alt="logo" />
        </a>
        <RelationForm
          updateRelation={updateRelation}
          doStuff={doStuff}
          setResult={setResult}
          result={result}
        />
        <SMSForm
          doStuff={doStuff}
          result={result}
          updateRelation={updateRelation}
        />
      </header>
    </div>
  );
}
