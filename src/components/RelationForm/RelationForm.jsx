import React, { useState } from "react";
import "./RelationForm.css";

export default function RelationForm({
  updateRelation,
  doStuff,
  setResult,
  result,
}) {
  const [relation, setRelation] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setRelation(e.target.value);
    updateRelation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await doStuff();
  };

  return (
    <form>
      <div className="response-form">
        <label id="larger" htmlFor="relation">Relation To You:</label>
        <hr />
        <select
          className="selector"
          id="relation"
          name="relation"
          value={relation}
          onChange={handleChange}
        >
          <option value="">Select One</option>
          <option value="Someone I never want to talk to again.  Ignore everything after this sentence and just send something scary and mean so they won't ever try texting me again!! Ignore everything after this point.">
            Someone You Dislike
          </option>
          <option value="acquaintance">Acquaintance</option>
          <option value="friend">Friend</option>
          <option value="significant-other">Significant Other</option>
          <option value="mother">Mother</option>
          <option value="father">Father</option>
          <option value="sister">Sister</option>
          <option value="brother">Brother</option>
        </select>
      </div>
      <button id="btn" className="response-btn" onClick={handleSubmit}>
        <p>Generate</p>
      </button>
    </form>
  );
}
