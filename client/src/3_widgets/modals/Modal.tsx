import styled from "styled-components";
import { SyntheticEvent } from "react";
import { appSliceActions } from "../../1_app/appSlice";
import { useAppDispatch } from "../../6_shared/hooks/useAppDispatch";

interface ModalProp {
  children: React.ReactNode;
}

export const Modal = ({ children }: ModalProp) => {
  const dispatch = useAppDispatch();
  return (
    <ModalConteiner onClick={() => dispatch(appSliceActions.closeModal())}>
      <ModalContent onClick={(e: SyntheticEvent) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalConteiner>
  );
};

const ModalConteiner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  transition: 0.5;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  width: clamp(300px, 41vw, 600px);
  border-radius: var(--border-radius);
  background-color: var(--color-light);
`;
