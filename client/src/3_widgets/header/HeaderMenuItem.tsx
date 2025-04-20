import { NavLink } from "react-router";
import styled from "styled-components";

export interface HeaderMenuItemProp {
  text: string;
  path: string;
}

export const HeaderMenuItem = ({ text, path }: HeaderMenuItemProp) => {
  return (
    <Item>
      <StyledNavLink to={path}>{text}</StyledNavLink>
    </Item>
  );
};

const Item = styled.li`
  font-weight: 700;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  &.active {
    color: var(--color-blue);
  }

  &:hover {
    opacity: 80%;
    cursor: pointer;
  }
`;
