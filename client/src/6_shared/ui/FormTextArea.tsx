import { FormInputProp } from "./FormInput";
import styled from "styled-components";

export const FormTextarea = ({
  register,
  title,
  placeholder,
  errorMessage,
}: FormInputProp) => {
  return (
    <Container>
      {/* <label>{title}</label> */}
      <StyledTextArea
        autoComplete="off"
        readOnly={false}
        {...register}
        placeholder={placeholder}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 5px;

  width: 100%;
`;

const StyledTextArea = styled.textarea`
  min-height: 100px;
  width: 100%;
  background-color: var(--color-light);
  text-align: start;
  resize: none;
`;

const ErrorMessage = styled.p`
  margin: 0;
  font-size: 11px;
  color: var(--color-red);
`;
