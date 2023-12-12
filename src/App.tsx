import { useRef, useEffect } from "react";
import styled from "styled-components";
import { Acordion } from "./Acordion";


const LayerTask = styled.div`
  padding: 18px 11px;
  width: 381px;
  height: 306px;
  position: absolute;
  border-radius: 6px;
  background: var(--gray-0, #a0b7e4);
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.20),
    0px 30px 70px 0px rgba(26, 34, 64, 0.15),
    0px 0px 0px 1px rgba(136, 143, 170, 0.10);
`;

function App() {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!childRef.current || !parentRef.current) return;

    const parentElement = parentRef.current;
    const childElement = childRef.current;
    let offsetX: number, offsetY: number;

    const move = (e: MouseEvent) => {
      const maxX = parentElement.clientWidth - childElement.clientWidth;
      const maxY = parentElement.clientHeight - childElement.clientHeight;

      let newX = e.clientX - offsetX;
      let newY = e.clientY - offsetY;

      // Ограничиваем перемещение в пределах родительского блока
      newX = Math.min(Math.max(0, newX), maxX);
      newY = Math.min(Math.max(0, newY), maxY);

      childElement.style.left = `${newX}px`;
      childElement.style.top = `${newY}px`;
    };

    const handleMouseDown = (e: MouseEvent) => {
      childElement.style.cursor = "grabbing";
      offsetX = e.clientX - childElement.offsetLeft;
      offsetY = e.clientY - childElement.offsetTop;
      document.addEventListener("mousemove", move);
    };

    const handleMouseUp = () => {
      childElement.style.cursor = "grab";
      document.removeEventListener("mousemove", move);
    };

    childElement.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      childElement.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={parentRef}
      style={{ width: "80vw", height: "90vh", backgroundColor: "gray", position: "relative" }}
    >
      <LayerTask ref={childRef}>
        <Acordion></Acordion>
      </LayerTask>
    </div>
  );
}

export default App;
