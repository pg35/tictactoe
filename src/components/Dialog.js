import React from "react";

const Overlay = ({ style, children }) => {
  return (
    <div className="overlay" style={style}>
      {children}
    </div>
  );
};

const Dialog = (props) => {
  return [
    <Overlay key="1" />,
    <Overlay
      key="2"
      style={{
        opacity: 1,
        background: "none",
        display: "flex",
        alignItems: "center"
      }}
    >
      <div className="dialog">{props.children}</div>
    </Overlay>
  ];
};

export { Dialog as default, Overlay };
