import React from "react";

const Header = (props) => {
  const { image, title } = props;
  return (
    <div className="subform-parent">
      <h2 className="text-center font-weight-bold mb-4">
        {image ? (
          <img
            src={image}
            height={85}
            width={85}
            style={{ marginRight: "20px" }}
          ></img>
        ) : null}
        {title}
      </h2>
    </div>
  );
};

export default Header;
