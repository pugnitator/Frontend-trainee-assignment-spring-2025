import styled from "styled-components";
import { UseFormRegister } from "react-hook-form";

export interface FormInputProp {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: ReturnType<UseFormRegister<any>>;
  title: string;
  placeholder: string;
  type?: string;
  errorMessage?: string;
  disabled?: boolean;
}

export const FormInput = ({
  register,
  placeholder,
  type,
  errorMessage,
  disabled,
}: FormInputProp) => {
  return (
    <Container>
      <StyledInput
        {...register}
        type={type ?? "text"}
        placeholder={placeholder}
        disabled={disabled}
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

const StyledInput = styled.input`
  height: 40px;
  width: 100%;
  background-color: var(--color-light);
`;

const ErrorMessage = styled.p`
  margin: 0;
  font-size: 11px;
  color: var(--color-red);
`;
