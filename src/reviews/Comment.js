import React, { useState } from "react";

const Comment = ({ name, time, content, onDelete }) => {
  const [sure, setSure] = useState(false);

  const deleteComment = () => {
    onDelete(); // Call the delete function passed as a prop
  };

  return (
    <div className="border-bottom py-3">
      <div className="d-flex align-items-center mb-2 gap-3">
        <div
          className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
          style={{ width: "40px", height: "40px" }}
        >
          <span className="font-weight-bold">{name.charAt(0)}</span>
        </div>
        <div
          className="d-flex align-items-center justify-content-between"
          style={{
            width: "calc(100% - 40px)",
          }}
        >
          <div className="ml-3">
            <div className="">
              <h6 className="mb-0">{name}</h6>
              <small className="text-muted">{time}</small>
            </div>
          </div>
          {name === "Current User" ? (
            sure ? (
              <span
                onClick={deleteComment}
                style={{ cursor: "pointer" }}
                className="text-danger"
              >
                Sure?
              </span>
            ) : (
              <i
                className="material-icons text-danger"
                onClick={() => setSure(true)}
                style={{ cursor: "pointer" }}
              >
                delete
              </i>
            )
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="mb-0">{content}</p>
    </div>
  );
};

export default Comment;
