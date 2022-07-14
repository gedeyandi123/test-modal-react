import React, { useContext } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useDisableBodyScroll, useKeypress } from "../../hooks";

const modalContext = React.createContext();

const ModalRender = ({ item }) => {
  return (
    <>
      {typeof item === "string" ? (
        <div dangerouslySetInnerHTML={{ __html: item }} />
      ) : (
        item
      )}
    </>
  );
};

const Modal = ({ children = null, show = false, onClose = () => null }) => {
  useDisableBodyScroll(show);

  useKeypress("Escape", show, onClose);

  return ReactDOM.createPortal(
    <>
      {show ? (
        <div
          className="modal-container"
          role="dialog"
          aria-modal="true"
          onClick={onClose}
        >
          <div
            className="modal-content"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <modalContext.Provider value={{ onClose }}>
              {children}
            </modalContext.Provider>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("portal")
  );
};

Modal.Header = function ModalHeader({ children }) {
  const { onClose } = useContext(modalContext);

  return (
    <div className="modal-header">
      <ModalRender item={children} />
      <div className="cross-btn" title="close modal" onClick={onClose}>
        &times;
      </div>
    </div>
  );
};

Modal.Body = ({ children }) => (
  <div className="modal-body">
    <ModalRender item={children} />
  </div>
);

Modal.Footer = ({ children }) => (
  <div className="modal-footer">
    <ModalRender item={children} />
  </div>
);

Modal.Footer.CloseBtn = function CloseBtn(props) {
  const { onClose } = React.useContext(modalContext);
  return (
    <button
      {...props}
      className="close-btn"
      title="close modal"
      onClick={onClose}
    />
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
