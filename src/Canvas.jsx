import React, { useRef, useEffect } from "react";
import TreeDrawer from "./TreeDrawer";

export default function Canvas(props) {
  const { treetodraw, ...rest } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let dpi = window.devicePixelRatio;

    //get CSS height
  //the + prefix casts it to an integer
  //the slice method gets rid of "px"
  let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
  //get CSS width
  let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
  //scale the canvas
  canvas.setAttribute('height', style_height * dpi);
  canvas.setAttribute('width', style_width * dpi);

    let treeDrag = new TreeDrawer();

    treeDrag.makeDraw(context, treetodraw)

   
    
    /* console.log("a") */
    return () => {
      
    };
  }, [treetodraw]);

  return <div className="viewport-canvas">
      <canvas ref={canvasRef} {...props} />
  </div>;
}

