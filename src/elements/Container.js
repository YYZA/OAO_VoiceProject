import React from "react";
import styled from "styled-components";

const Container = (props) => {
  const { padding, _className, children } = props;

  const styles = {
    padding,
    className: _className,
  };

  return <ContainerBox {...styles}>{children}</ContainerBox>;
};

const ContainerBox = styled.div`
  padding: 20px;
  max-width: 425px;
  width: 100%;
  margin: 0 auto;
`;

export default Container;
