import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { bg, children, _onClick, _disabled, margin, border } = props;

  console.log("버튼 disabled", _disabled);
  const styles = {
    bg,
    margin,
    border,
  };

  return (
    <ButtonWrap
      type={"button"}
      {...styles}
      onClick={_onClick}
      disabled={_disabled}
    >
      {children}
    </ButtonWrap>
  );
};

Button.defaultProps = {
  bg: false,
  margin: "",
  border: false,
};

const ButtonWrap = styled.button`
  font-family: "Black Han Sans", serif;
  font-size: 20px;
  width: 100%;
  height: 60px;
  color: white;
  border-radius: 10px;
  ${(props) => (props.bg ? "background:#F1134E;" : "background:black;")}
  ${(props) => (props.border ? "border: 3px solid #fff;" : "")}
  opacity: ${(props) => (props._disabled ? "0.5" : "1")};
  margin: ${(props) => props.margin};

`;

export default Button;
