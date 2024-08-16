import React, { useState } from "react";

const CommentForm = ({ selectedData, onCommentAdded }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      id: selectedData.comments.length + 1,
      name: "Current User", // Replace with actual user's name if available
      time: "Just now", // Placeholder time
      content: comment,
    };

    // Update the selectedData comments
    const updatedComments = [...selectedData.comments, newComment];

    // Update localStorage
    const storedData = JSON.parse(localStorage.getItem("currentData")) || [];
    const updatedData = storedData.map((item) => {
      if (item.id === selectedData.id) {
        return { ...item, comments: updatedComments };
      }
      return item;
    });

    localStorage.setItem("currentData", JSON.stringify(updatedData));

    // Notify parent component to re-render the comments
    onCommentAdded(updatedComments);

    // Reset the comment input
    setComment("");
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="form-group">
        <textarea
          className="form-control"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          required
        />
      </div>
      <div className="d-flex justify-content-end mt-3 gap-3">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setComment("")}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
