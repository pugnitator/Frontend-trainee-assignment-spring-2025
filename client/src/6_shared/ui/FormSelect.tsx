import { Controller, Control, RegisterOptions } from "react-hook-form";
import styled from "styled-components";
import Select from "react-select";

export interface FormSelectProp {
  title?: string;
  errorMessage?: string;
  options: { value: string | number; label: string }[];
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
  rules?: RegisterOptions;
  isDisabled?: boolean;
}

export const FormSelect = ({
  title,
  errorMessage,
  options,
  name,
  control,
  rules,
  isDisabled,
}: FormSelectProp) => {
  return (
    <Container>
      {title ?? <label>{title}</label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <StyledSelectWrapper>
            <Select
              options={options}
              value={
                options.find((option) => option.value === field.value) || null
              }
              onChange={(selected) =>
                field.onChange(selected ? selected.value : null)
              }
              placeholder="Выберите вариант"
              isClearable
              isDisabled={isDisabled}
              menuPlacement="auto"
              styles={{
                control: (base, state) => ({
                  ...base,
                  width: "100%",
                  alignContent: "center",
                  maxHeight: "40px",
                  lineHeight: "1px",
                  padding: "5px",
                  backgroundColor: "var(--color-light)",
                  borderColor: state.isFocused
                    ? "var(--color-blue)"
                    : "var(--color-gray)",
                  borderRadius: "var(--border-radius-small)",
                  fontSize: "16px",
                  outline: "none",
                  boxShadow: "none",
                }),
                menu: (base) => ({
                  ...base,
                  maxHeight: "100px",
                  backgroundColor: "var(--color-light)",
                  borderRadius: "var(--border-radius-small)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  maxWidth: "100%",
                  zIndex: 9999,
                  position: "absolute",
                }),
                menuList: (base) => ({
                  ...base,
                  maxHeight: "100px",
                  overflowY: "auto",
                  padding: "0",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "var(--color-blue)",
                    borderRadius: "var(--border-radius-small)",
                  },
                }),
                option: (base, state) => ({
                  ...base,
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  padding: "5px 10px",
                  backgroundColor: "var(--color-light)",
                  color: "inherit",
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: "var(--color-gray-light)",
                    cursor: "pointer",
                  },
                }),
              }}
            />
          </StyledSelectWrapper>
        )}
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

const StyledSelectWrapper = styled.div`
  width: 100%;
`;

const ErrorMessage = styled.p`
  margin: 0;
  font-size: 11px;
  color: var(--color-red);
`;
