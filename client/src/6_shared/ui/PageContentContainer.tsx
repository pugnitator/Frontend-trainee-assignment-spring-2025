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
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 30px;

  flex-grow: 1;

  padding: 30px var(--content-container-padding-x);
  width: 100%;
  max-width: 1280px;
  min-width: 360px;
  height: 100%;
`;