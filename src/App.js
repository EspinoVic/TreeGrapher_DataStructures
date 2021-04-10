import Canvas from "./Canvas";
import NAryTree from "./NAryTree";

function App() {
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(80, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  let myTree = new NAryTree();
  myTree.buildTree("A;B;E;/F;K;///C;/D;G;/H;/I;/J;///");
/*   let ser = myTree.serialize();
  myTree.buildTree(ser); */
  let leafsCount = myTree.getLeafsCount();
  return (
    <div className="App">
      <Canvas draw={draw}></Canvas>
    </div>
  );
}

export default App;
