import React from "react";

const Comment = ({ name, time, content }) => {
  return (
    <div className="border-bottom py-3">
      <div className="d-flex align-items-center mb-2 gap-3">
        <div
          className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
          style={{ width: "40px", height: "40px" }}
        >
          <span className="font-weight-bold">{name.charAt(0)}</span>
        </div>
        <div className="ml-3">
          <h6 className="mb-0">{name}</h6>
          <small className="text-muted">{time}</small>
        </div>
      </div>
      <p className="mb-0">{content}</p>
    </div>
  );
};

export default Comment;
