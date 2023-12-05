// EditAdForm.js
import React, { useState } from "react";

const EditAdForm = ({ ad, onSave, onCancel }) => {
  const [editedAd, setEditedAd] = useState({ ...ad });

  const handleInputChange = (e) => {
    setEditedAd({
      ...editedAd,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(editedAd);
  };

  return (
    <div>
      <h2>Edit Ad</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={editedAd.title}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={editedAd.description}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        {/* Add more fields as needed */}
        <button type="button" className="btn btn-danger m-2" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditAdForm;
