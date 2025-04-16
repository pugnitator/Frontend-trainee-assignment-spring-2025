import styled from "styled-components";

const Loader = () => {
  return (
    <Container>
      <Text>Загрузка</Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
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

export default Loader;
