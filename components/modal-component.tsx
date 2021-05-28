import React, { useEffect, useState, ReactNode } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StyledModal = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  width: 80%;
  max-width: 500px;
  max-height: 80%;
  min-height: 300px;
  background: white;
  border-radius: 15px;
  overflow-y: auto;
`;

const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

interface MoadlProps {
  show: boolean
  onClose: Function
  children: ReactNode
}

const Modal: React.FC<MoadlProps> = ({ show, onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay onClick={handleCloseClick}>
      <StyledModal onClick={(e) => { e.stopPropagation(); }}>
        <StyledModalBody>{children}</StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root"),
    );
  } else {
    return null;
  }
}

export default Modal;