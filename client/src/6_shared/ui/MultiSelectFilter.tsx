import styled from "styled-components";
import Select from "react-select";

interface MultiSelectFilterProp {
  options: { value: string | number; label: string }[];
  name: string;
  placeHolder: string;
  onChange: (values: (string | number)[]) => void;
  clearFilter: () => void;
}

export const MultiSelectFilter = ({
  options,
  placeHolder,
  onChange,
  clearFilter,
}: MultiSelectFilterProp) => {
  return (
    <Container>
      <StyledSelectWrapper>
        <Select
          options={options}
          placeholder={placeHolder}
          isMulti
          isClearable
          menuPlacement="auto"
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          onChange={(selectedOptions) => {
            if (!selectedOptions || selectedOptions.length === 0) {
              clearFilter();
            } else {
              const values = selectedOptions.map((opt) => opt.value);
              onChange(values);
            }
          }}
          styles={{
            control: (base, state) => ({
              ...base,
              alignContent: "center",
              width: "100%",
              minWidth: "200px",
              maxHeight: "32px",
              padding: "5px 10px",
              font: "inherit",
              color: "inherit",
              backgroundColor: "var(--color-light)",
              border: "none",
              borderRadius: "var(--border-radius-small)",
              outline: "none",
              boxShadow: state.isFocused
                ? "0 0 0 1px var(--color-blue)"
                : "none",
              minHeight: "unset",
              "&:hover": {
                border: "none",
                cursor: "pointer",
              },
              "&::placeholder": {
                color: "var(--color-gray)",
              },
            }),
            valueContainer: (base, props) => ({
              ...base,
              padding: "0 8px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontSize: "inherit",
              color: "var(--color-dark)",
              "&::before": {
                content: props.getValue().length
                  ? `"Выбрано: ${props.getValue().length}"`
                  : `""`,
                opacity: props.getValue().length ? 1 : 0.5,
              },
            }),
            input: (base) => ({
              ...base,
              margin: "0",
              padding: "0",
            }),
            multiValue: (base) => ({
              ...base,
              display: "none",
            }),
            multiValueLabel: (base) => ({
              ...base,
              padding: "2px 5px",
              fontSize: "14px",
            }),
            multiValueRemove: (base) => ({
              ...base,
              borderRadius: "var(--border-radius-small)",
              ":hover": {
                backgroundColor: "var(--color-gray)",
                cursor: "pointer",
              },
            }),
            menu: (base) => ({
              ...base,
              maxHeight: "200px",
              backgroundColor: "var(--color-light)",
              borderRadius: "var(--border-radius-small)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              maxWidth: "100%",
              zIndex: 9999,
              position: "absolute",
            }),
            menuList: (base) => ({
              ...base,
              maxHeight: "200px",
              overflowY: "auto",
              padding: "5px 0",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "var(--color-blue)",
                borderRadius: "var(--border-radius-small)",
              },
            }),
          }}
          components={{
            Option: ({ innerProps, isSelected, data, isFocused }) => (
              <div
                {...innerProps}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "5px 10px",
                  backgroundColor: isSelected
                    ? "var(--color-gray-light)"
                    : isFocused
                    ? "var(--color-gray-light)"
                    : "transparent",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}}
                  style={{ padding: "0" }}
                />
                <span>{data.label}</span>
              </div>
            ),
          }}
        />
      </StyledSelectWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  width: 100%;
`;

const StyledSelectWrapper = styled.div`
  width: 100%;
`;
