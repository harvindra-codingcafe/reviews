import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentSection = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("currentData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const handleCommentAdded = (updatedComments) => {
    // Update selectedData with new comments
    const updatedSelectedData = { ...selectedData, comments: updatedComments };
    setSelectedData(updatedSelectedData);

    // Update the main data state
    const updatedData = data.map((item) =>
      item.id === updatedSelectedData.id ? updatedSelectedData : item
    );
    setData(updatedData);
  };

  return (
    <div className="container">
      <div className="row m-0 top_bar">
        {data?.map((item) => (
          <div className="top_bar-single text-center col-2 p-0" key={item.id}>
            <div className="bg-dark py-2">
              <span
                className={`w-100 d-block py-1 ${
                  selectedData?.id === item.id ? "selected" : ""
                }`}
                onClick={() => setSelectedData(item)}
                style={{
                  borderTop: "2px dashed #fff",
                  borderBottom: "2px dashed #fff",
                }}
              >
                <span className="d-block bg-success">
                  <img src={item.image} className="mw-100" alt={item.name} />
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: "calc(100vh - 68px)" }}>
        <div className="row h-100">
          <div className="col-2 h-100">
            <div className="left_bar h-100">
              {data?.map((item) => (
                <div
                  className={`left_bar-single ${
                    selectedData?.id === item.id ? "selected" : ""
                  }`}
                  key={item.id}
                >
                  <img
                    onClick={() => setSelectedData(item)}
                    src={item.image}
                    className="w-100"
                    alt={item.name}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-10">
            {selectedData ? (
              <div className="comments mt-3">
                <div className="card bg-light">
                  <div className="card-body">
                    <div className="all_comments">
                      {selectedData?.comments.map((comment) => (
                        <Comment
                          key={comment.id}
                          name={comment.name}
                          time={comment.time}
                          content={comment.content}
                        />
                      ))}
                    </div>
                    <CommentForm
                      selectedData={selectedData}
                      onCommentAdded={handleCommentAdded}
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
