import React, { ReactNode } from "react";
import { StyledBlurredBackground } from "../common/BlurredBackground";
import { ModalCloseButton } from "../common/ModalCloseButton";
import { StyledTweetModalContainer } from "../tweet-modal/TweetModalContainer";
import ReactDom from "react-dom"

interface PostModalProps {
  onClose: () => void;
  show: boolean;
  children: ReactNode;
}

export const PostModal = ({ onClose, show, children }: PostModalProps) => {
  const handleClickOutside = (event: React.MouseEvent) => {
    if(event.target === event.currentTarget) {
      onClose();
    }
  };

  const portalElement = document.getElementById("portal");
  if(!portalElement){
    return null;
  } else{
    return ReactDom.createPortal(
      <>
      {show && (
        <StyledBlurredBackground onClick={handleClickOutside}>
          <StyledTweetModalContainer>
            {/* onClick? */}
            <ModalCloseButton onClick={onClose} />
            {children}
          </StyledTweetModalContainer>
        </StyledBlurredBackground>
      )}
    </>,
    portalElement
    );
  }
}

