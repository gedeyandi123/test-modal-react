import { useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useDisableBodyScroll, useKeypress } from "../../hooks";

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

const Modal = ({
  show = false,
  onClose = () => null,
  header = "Header",
  body = "Body",
  footer = "Footer",
}) => {
  const modalRef = useRef();

  useDisableBodyScroll(show);

  useKeypress("Escape", show, onClose);

  const closeOnOutsideClicked = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <>
      {show ? (
        <>
          <div
            className="modal-container"
            ref={modalRef}
            onClick={(e) => closeOnOutsideClicked(e)}
          >
            <div className="modal-content">
              <header className="modal-header">
                <div className="cross-btn" onClick={onClose}>
                  &times;
                </div>
                <ModalRender item={header} />
              </header>
              <main className="modal-body">
                <ModalRender item={body} />
              </main>
              <footer className="modal-footer">
                <ModalRender item={footer} />
              </footer>
            </div>
          </div>
        </>
      ) : null}
    </>,
    document.getElementById("portal")
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default Modal;
