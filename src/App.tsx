import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Acordion } from "./Acordion";

const LayerTask = styled.div`
  padding: 18px 11px;
  width: 381px;
  height: 306px;
  position: absolute;
  border-radius: 6px;
  background: white;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.20),
    0px 30px 70px 0px rgba(26, 34, 64, 0.15),
    0px 0px 0px 1px rgba(136, 143, 170, 0.10);
`;

const modalData = [
  { id: 1, content: <Acordion /> },
  { id: 2, content: <Acordion /> },
];

function App() {
  const parentRef = useRef<HTMLDivElement>(null);
  const [modals, setModals] = useState(modalData);

  useEffect(() => {
    if (!parentRef.current) return;

    const parentElement = parentRef.current;

    modals.forEach((modal) => {
      const childElement = document.getElementById(`modal-${modal.id}`);

      if (!childElement) return;

      let offsetX: number, offsetY: number;

      const move = (e: MouseEvent) => {
        const maxX = parentElement.clientWidth - childElement.clientWidth;
        const maxY = parentElement.clientHeight - childElement.clientHeight;

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        newX = Math.min(Math.max(0, newX), maxX);
        newY = Math.min(Math.max(0, newY), maxY);

        childElement.style.left = `${newX}px`;
        childElement.style.top = `${newY}px`;
      };

      const handleMouseDown = (e: MouseEvent) => {
        //все элементы кроме текущего ставим ниже по z-index
        modals.forEach((modal) => {
          const otherElement = document.getElementById(`modal-${modal.id}`);
          if (otherElement && otherElement !== childElement) {
            otherElement.style.zIndex = "1";
          }
        });
        childElement.style.cursor = "grabbing";
        childElement.style.zIndex = "1000";
        offsetX = e.clientX - childElement.offsetLeft;
        offsetY = e.clientY - childElement.offsetTop;
        document.addEventListener("mousemove", move);
      };

      //при клике 
      const handleClick = (modalId: number) => () => {
        const clickedElement = document.getElementById(`modal-${modalId}`);
        if (clickedElement) {
          clickedElement.style.zIndex = "1000";
        }
      };

      //когда отпустили модальное окно 
      const handleMouseUp = () => {
        childElement.style.cursor = "grab";
        document.removeEventListener("mousemove", move);
      };

      //добавляем все обработчики
      childElement.addEventListener("mousedown", handleMouseDown);
      childElement.addEventListener("click", handleClick(modal.id));
      document.addEventListener("mouseup", handleMouseUp);

      //удаляем все обработчики при размонтировании 
      return () => {
        childElement.removeEventListener("mousedown", handleMouseDown);
        childElement.removeEventListener("click", handleClick(modal.id));
        document.removeEventListener("mouseup", handleMouseUp);
      };
    });
  }, [modals]);

  return (
    <div
      ref={parentRef}
      style={{ width: "80vw", height: "90vh", backgroundColor: "gray", position: "relative" }}
    >
      {modals.map((modal) => (
        <LayerTask key={modal.id} id={`modal-${modal.id}`} >
          {modal.content}
        </LayerTask>
      ))}
    </div>
  );
}

export default App;
