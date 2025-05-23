import styled from "styled-components";
import { SyntheticEvent } from "react";
import { appSliceActions } from "@/1_app/appSlice";
import { useAppDispatch } from "@/6_shared/index";

interface ModalProp {
  children: React.ReactNode;
}

export const Modal = ({ children }: ModalProp) => {
  const dispatch = useAppDispatch();

  return (
    <ModalConteiner onMouseDown={() => dispatch(appSliceActions.closeModal())}>
      <ModalContent onMouseDown={(e: SyntheticEvent) => e.stopPropagation()}>
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
  z-index: 9999;

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
  width: fit-content;
  /* border-radius: var(--border-radius);
  background-color: var(--color-light); */
`;
