import { useRef, useEffect } from "react"





function App() {
  console.log("рендер")
  const ref = useRef<HTMLDivElement>(null)
  console.log(ref)

  useEffect(() => {
    if(!ref || !ref.current) return
    console.log("ok")
    const element = ref.current;
    let offsetX: number, offsetY: number;

    //движение
    const move = (e: MouseEvent) => {
      element.style.left = `${e.clientX - offsetX}px`;
      element.style.top = `${e.clientY - offsetY}px`;
      console.log("element.style.left", element.style.left)
      console.log("element.style.top", element.style.top)
    };

    //
    const handleMouseDown = (e: MouseEvent) => {
      element.style.cursor = "grabbing";
      offsetX = e.clientX - element.offsetLeft;
      offsetY = e.clientY - element.offsetTop;
      element.addEventListener("mousemove", move);
    };

    const handleMouseUp = () => {
      element.style.cursor = "grab";
      element.removeEventListener("mousemove", move)
    }

    element.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      element.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [ref])
  
  console.log(ref)
  return(
    <>
      {/* <div style={{width: "1000px", height: "1000px"}}> */}
        <div ref={ref} style={{width: "400px", height: "300px", backgroundColor: "gray", position: "absolute"}}>
          привет
        </div>
      {/* </div> */}
    </>
  )
}

export default App







