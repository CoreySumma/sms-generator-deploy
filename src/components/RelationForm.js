import React, { useState } from "react";
import './RelationForm.css';


export default function RelationForm({updateRelation, doStuff}) {
  const [relation, setRelation] = useState("");
  
  const handleChange = (e) => {
    e.preventDefault();
    setRelation(e.target.value);
    updateRelation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await doStuff();
  }

  return (
    <form>
      <div className="response-form">
        <label htmlFor="relation">Relation To You:</label>
        <hr />
        <select
        className="selector"
          id="relation"
          name="relation"
          value={relation}
          onChange={handleChange}
        >
          <option value="">Select One</option>
          <option value="friend">Friend</option>
          <option value="acquaintance">Acquaintance</option>
          <option value="significant-other">Significant other</option>
          <option value="mother">Mother</option>
          <option value="father">Father</option>
          <option value="sister">Sister</option>
          <option value="brother">Brother</option>
        </select>
      </div>
      <button
      className="response-btn"
      onClick={handleSubmit}
      >Generate Response</button>
    </form>
  );
}
