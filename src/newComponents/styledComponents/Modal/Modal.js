import React from "react";
import * as Style from "../styles/Modal";

function Modal({ children, show, close }) {
  return (
    <div>
      {show ? (
        <Style.Modal onClick={close}>
          <Style.ModalContent onClick={(e) => e.stopPropagation()}>
            {children}
          </Style.ModalContent>
        </Style.Modal>
      ) : null}
    </div>
  );
}

export default Modal;
