import styled from "styled-components";

export const Container = styled.div`
   background : ${({ theme }) => (theme.background)};
   width: 100vw;
   min-height: 100vh;
   padding-bottom: 20px;
`;
export const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 40px;
`;