import React, { useEffect, useState } from "react";
import Modal from "../../modal/Modal";
import logo from "../../../assets/logo.png";
import Button from "../../button/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SwitchButton from "../../switch/SwitchButton";
import { ButtonType } from "../../button/StyledButton";
// import { useAppSelector } from "../../../redux/hooks";
import { StyledPromptContainer } from "./PromptContainer";
import { StyledContainer } from "../../common/Container";
import { StyledP } from "../../common/text";
import { LightTheme, Theme } from "../../../util/LightTheme";

interface LogoutPromptProps {
  show: boolean;
}

const LogoutPrompt = ({ show }: LogoutPromptProps) => {
  const [showPrompt, setShowPrompt] = useState<boolean>(show);
  const [showModal, setShowModal] = useState<boolean>(false);
  // const [theme, setTheme] = useState<Partial<Theme>>(LightTheme); Change theme
  // const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const handleClick = () => {
    setShowModal(true);
  };

  const handleLanguageChange = () => {
    if (i18n.language === "es") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("es");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

/*  const handleBackgroundColorChange = () => {
    setTheme((prevTheme) => {
      if(!prevTheme){
        return LightTheme;
      }

      return {
        ...prevTheme as Theme,
        background: prevTheme.background === LightTheme.background ? (prevTheme.colors ? prevTheme.colors.black : LightTheme.colors!.black) : LightTheme.background,
      };
    });
  }
*/
  useEffect(() => {
    setShowPrompt(show);
  }, [show]);

  /*
  useEffect(()=>{
    if(theme && theme.background)
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.colors?.white || LightTheme.colors!.white;
  },[theme])
  */

  return (
    <>
      {showPrompt && (
        <StyledPromptContainer>
          <StyledContainer
            flexDirection={"row"}
            gap={"16px"}
            borderBottom={"1px solid #ebeef0"}
            padding={"16px"}
            alignItems={"center"}
          >
            <StyledP primary>Es:</StyledP>
            <SwitchButton
              checked={i18n.language === "es"}
              onChange={handleLanguageChange}
            />
            {/*
            <StyledP primary>Change theme: </StyledP>
            <SwitchButton
              checked={theme.background === LightTheme.background}
              onChange={handleBackgroundColorChange}
            />
             */}
          </StyledContainer>
          <StyledContainer onClick={handleClick} alignItems={"center"}>
            <StyledP primary>{`${t("buttons.logout")}`}</StyledP>
          </StyledContainer>
        </StyledPromptContainer>
      )}
      <Modal
        show={showModal}
        text={t("modal-content.logout")}
        img={logo}
        title={t("modal-title.logout")}
        acceptButton={
          <Button
            buttonType={ButtonType.FOLLOW}
            text={t("buttons.logout")}
            size={"MEDIUM"}
            onClick={handleLogout}
          />
        }
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default LogoutPrompt;
