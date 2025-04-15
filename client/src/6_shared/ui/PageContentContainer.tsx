import styled from "styled-components";

interface PageContentContainerProp {
    children: React.ReactNode
};

export const PageContentContainer = ({children}: PageContentContainerProp) => {
    return(
        <Container>
            {children}
        </Container>
    )
};

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-grow: 1;

  padding: 50px var(--content-container-padding-x);
  width: 100%;
  height: 100%;
`;