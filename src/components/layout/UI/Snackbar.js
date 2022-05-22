import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  Fragment,
} from "react";
import ReactDOM from "react-dom";
import "./Snackbar.css";

const Snackbar = forwardRef((props, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    },
  }));
  const portalElement = document.getElementById("snakbar");
  const Bar = () => {
    return (
      <Fragment>
        {console.log("ahmed")}
        {ReactDOM.createPortal(
          <div
            className="snackbar"
            style={{
              backgroundColor: props.type === "success" ? "#00F593" : "#FF0033",
              color: props.type === "success" ? "black" : "white",
            }}
          >
            <div className="symbol">
              {props.type === "success" ? <h1>&#x2713;</h1> : <h1>&#x2613;</h1>}
            </div>
            <div className="message">{props.message}</div>
          </div>,
          portalElement
        )}
      </Fragment>
    );
  };
  return (
    <Fragment>
      {showSnackbar && <Bar />}
    </Fragment>
  );
});

export default Snackbar;
