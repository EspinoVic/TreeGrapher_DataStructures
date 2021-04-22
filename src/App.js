import Canvas from "./Canvas";
import NAryTree from "./NAryTree";
import {N_Ary_Tree,Node} from "./N_Ary_Tree";

function App() {
  /* const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(80, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  }; */

  let myTree = new N_Ary_Tree();
 /*  myTree.deserialize("A;B;E;/;F;K;/;/;/;C;/;D;G;/;H;/;I;/;J;/;/;/;");              
  let data = myTree.serialize();
  myTree.deserialize(data);
  let data2 = myTree.serialize();
 */
  let temp =  new Node("A");
  myTree.root =temp;
  myTree.root.children[0] = new Node("B");
  myTree.root.children[1] = new Node("D");
  myTree.root.children[2] = new Node("H");


  myTree.root.children[0].children[0] = new Node("C");
  myTree.root.children[1].children[0] = new Node("E");
  myTree.root.children[2].children[0] = new Node("I");
  myTree.root.children[2].children[1] = new Node("J");

  myTree.root.children[1].children[0].children[0] = new Node("F");
  myTree.root.children[1].children[0].children[1] = new Node("G");

/*   let data = myTree.serialize();
  myTree.deserialize(data);
  let data2 = myTree.serialize();
 
  let countLeaf = myTree.getLeafsCount();
  let countDeep = myTree.getTreeHeight(); */

  return (
    <div className="App">
      <Canvas treetodraw={myTree}></Canvas>
    </div>
  );
}


export default App;
