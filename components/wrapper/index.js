import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: ${(props) => props.theme.size.pageWidth};
`;

export default Wrapper;
