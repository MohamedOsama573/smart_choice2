import { useState } from "react";
import Slider from "react-slick";

function Resizable() {
  const [display, setDisplay] = useState(true);
  const [width, setWidth] = useState(1500);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };
  return (
    <div className="slider-container">
      <button className="button" onClick={() => setWidth(width + 100)}>
        {" "}
        increase{" "}
      </button>
      <button className="button" onClick={() => setWidth(width - 100)}>
        {" "}
        decrease{" "}
      </button>
      <button className="button" onClick={() => setDisplay(!display)}>
        {" "}
        toggle{" "}
      </button>
      <div
        style={{
          width: width + "px",
          display: display ? "block" : "none"
        }}
      >
        <Slider {...settings}>
          <div className="text-center"> 
            <h3 className="p-24 bg-amber-100 text-3xl">1</h3>
          </div>
          <div>
            <h3 className="p-24 bg-blue-100 text-3xl">2</h3>
          </div>
          <div>
            <h3 className="p-24 bg-cyan-100 text-3xl">3</h3>
          </div>
          <div>
            <h3 className="p-24 bg-fuchsia-100 text-3xl">4</h3>
          </div>
          <div>
            <h3 className="p-24 bg-emerald-100 text-3xl">5</h3>
          </div>
          <div>
            <h3 className="p-24 bg-green-100 text-3xl">6</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Resizable;
