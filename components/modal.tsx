import React, { useEffect, useState, ReactNode } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledModal = styled.div`
  background: white;
  width: 80%;
  max-width: 500px;
  height: 300px;
  border-radius: 15px;
  padding: 15px;
  text-align: center;
`;
const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
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