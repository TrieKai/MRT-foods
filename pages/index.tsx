import Head from "next/head";
import styled from "styled-components";

const Div = styled.h1`
  background-color: red;
`;

export const Home = () => {
  return <Div>MRT-foods</Div>;
};

export default Home;
