import React, { useState, useEffect, useRef } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import Slider from "react-slick";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import scene1 from "../assets/images/scene1-color.jpg";

const CommentSection = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  // Refs for the sliders
  const topSliderRef = useRef(null);
  const sideSliderRef = useRef(null);
  const sideSliderDOMRef = useRef(null); // Additional ref for the DOM element

  useEffect(() => {
    const storedData = localStorage.getItem("currentData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  // useEffect(() => {
  //   ReactTooltip.rebuild();
  // });

  useEffect(() => {
    const sideSliderDOM = sideSliderDOMRef.current;

    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        sideSliderRef.current.slickPrev(); // Scroll up
      } else {
        sideSliderRef.current.slickNext(); // Scroll down
      }
    };

    // Add wheel event listener to sideSlider DOM node
    if (sideSliderDOM) {
      sideSliderDOM.addEventListener("wheel", handleWheel);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      if (sideSliderDOM) {
        sideSliderDOM.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const handleCommentAdded = (updatedComments) => {
    const updatedSelectedData = { ...selectedData, comments: updatedComments };
    setSelectedData(updatedSelectedData);
    const updatedData = data.map((item) =>
      item.id === updatedSelectedData.id ? updatedSelectedData : item
    );
    setData(updatedData);
  };

  const handleSlideChange = (index) => {
    // Synchronize both sliders when one changes
    topSliderRef.current.slickGoTo(index);
    sideSliderRef.current.slickGoTo(index);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedData(data[0]);
    }
  }, [data]);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    draggable: true,
    centerMode: true,
    beforeChange: (current, next) => handleSlideChange(next), // Track slide changes
  };

  var settings2 = {
    dots: false,
    infinite: true,
    draggable: false,
    slidesToShow: 4,
    centerMode: true,
    vertical: true,
    beforeChange: (current, next) => handleSlideChange(next), // Track slide changes
    afterChange: (currentIndex) => {
      const activeItem = data[currentIndex];
      setSelectedData(activeItem);
    },
  };
  var settings3 = {
    dots: true,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    draggable: true,
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = selectedData.comments.filter(
      (comment) => comment.id !== commentId
    );

    const updatedSelectedData = { ...selectedData, comments: updatedComments };
    setSelectedData(updatedSelectedData);

    const updatedData = data.map((item) =>
      item.id === updatedSelectedData.id ? updatedSelectedData : item
    );
    setData(updatedData);
    localStorage.setItem("currentData", JSON.stringify(updatedData));
  };

  return (
    <>
      <div className="position-relative z-3">
        <Tooltip id="my-tooltip" clickable />
      </div>
      <div className="container">
        <div className="m-0 top_bar">
          <Slider {...settings} ref={topSliderRef}>
            {data.map((item, index) => (
              <div className="top_bar-single text-center p-0" key={item.id}>
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
                      <img
                        src={item.image}
                        className="mw-100"
                        alt={item.name}
                      />
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div>
          <div className="row h-100 mt-4 pt-2">
            <div className="col-3 left_bar h-100">
              <div ref={sideSliderDOMRef}>
                <Slider {...settings2} ref={sideSliderRef}>
                  {data?.map((item, index) =>
                    index === 0 ? (
                      <div key={item.id}>
                        <Slider {...settings3}>
                          <div>
                            <div
                              className={`left_bar-single ${
                                selectedData?.id === item.id ? "selected" : ""
                              }`}
                            >
                              <img
                                onClick={() => setSelectedData(item)}
                                src={item.image}
                                className="w-100"
                                alt={item.name}
                              />
                              <h4
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={item.name}
                                data-tooltip-place="top"
                                className="position-absolute text-white top-0 start-0 z-1 m-2"
                              >
                                Creators <i class="fa fa-info-circle"></i>
                              </h4>
                              <span className="position-absolute text-white bottom-0 start-0 z-1 m-2">
                                #{index + 1}
                              </span>
                              <span className="position-absolute text-white bottom-0 end-0 z-1 m-2">
                                {item.duration}
                              </span>
                            </div>
                          </div>
                          <div key={item.id}>
                            <div
                              className={`left_bar-single ${
                                selectedData?.id === item.id ? "selected" : ""
                              }`}
                            >
                              <img
                                onClick={() => setSelectedData(item)}
                                src={scene1}
                                className="w-100"
                                alt={item.name}
                              />
                              <h4
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={item.name}
                                data-tooltip-place="top"
                                className="position-absolute text-white top-0 start-0 z-1 m-2"
                              >
                                Creators <i class="fa fa-info-circle"></i>
                              </h4>
                              <span className="position-absolute text-white bottom-0 start-0 z-1 m-2">
                                #2
                              </span>
                              <span className="position-absolute text-white bottom-0 end-0 z-1 m-2">
                                {item.duration}
                              </span>
                            </div>
                          </div>
                        </Slider>
                      </div>
                    ) : (
                      <div key={item.id}>
                        <div
                          className={`left_bar-single ${
                            selectedData?.id === item.id ? "selected" : ""
                          }`}
                        >
                          <img
                            onClick={() => setSelectedData(item)}
                            src={item.image}
                            className="w-100"
                            alt={item.name}
                          />
                          <h4
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content={item.name}
                            data-tooltip-place="top"
                            className="position-absolute text-white top-0 start-0 z-1 m-2"
                          >
                            Creators <i class="fa fa-info-circle"></i>
                          </h4>

                          <span className="position-absolute text-white bottom-0 start-0 z-1 m-2">
                            #{index + 1}
                          </span>
                          <span className="position-absolute text-white bottom-0 end-0 z-1 m-2">
                            {item.duration}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </Slider>
              </div>
            </div>
            <div className="col-9">
              {selectedData ? (
                <div className="comments">
                  <div className="card bg-light">
                    <div className="card-body">
                      <div className="all_comments">
                        {selectedData?.comments.map((comment) => (
                          <Comment
                            key={comment.id}
                            name={comment.name}
                            time={comment.time}
                            content={comment.content}
                            onDelete={() => handleDeleteComment(comment.id)}
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
    </>
  );
};

export default CommentSection;
