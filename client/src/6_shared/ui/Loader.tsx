import styled from "styled-components";

interface LoaderProp {
  isError: boolean;
}

export const Loader = ({ isError }: LoaderProp) => {
  return (
    <Container>
      <Text>{isError ? "Ошибка загрузки" : "Загрузка"}</Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  font-weight: 700;
  gap: 10px;
  color: var(--color-blue);
`;

const Text = styled.span`
  font: inherit;
  padding: 0 5px 8px 0;
  background: repeating-linear-gradient(90deg, currentColor 0 8%, #0000 0 10%)
    200% 100% / 200% 3px no-repeat;
  animation: load 2s steps(6) infinite;

  @keyframes load {
    to {
      background-position: 80% 100%;
    }
  }
`;
