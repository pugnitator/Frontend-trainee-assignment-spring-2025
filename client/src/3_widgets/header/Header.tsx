import styled from "styled-components";
import { HeaderMenuItem } from "./HeaderMenuItem";
import {ROUTES} from '../../1_app/routes';

export const Header = () => {
  return (
    <StyledHeader>
      <Menu>
        <HeaderMenuItem text={'Проекты'} path={ROUTES.BOARDS}/>
        <HeaderMenuItem text={'Задачи'} path={ROUTES.ISSUES}/>
      </Menu>
      <CreateTaskButton type='button' onClick={() =>console.log('Открываю модалку')}>Создать задачу</CreateTaskButton>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);

  padding-inline: var(--content-container-padding-x);

  border-bottom: 2px solid var(--color-dark);
`;

const Menu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const CreateTaskButton = styled.button`
  display: inline-flex;
  align-items: center;

  color: var(--color-light);
  background-color: var(--color-blue);
`
