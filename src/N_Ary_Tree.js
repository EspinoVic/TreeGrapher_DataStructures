export class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

export class N_Ary_Tree {
  constructor() {
    this.root = null;
    
  }

  serialize() {
    let treeSerObj = { treeSer: "" };
    this.buildSerialized(treeSerObj, this.root);
    return treeSerObj.treeSer;
  }

  buildSerialized(objTreeSerialized, currentNode = this.root) {
    objTreeSerialized.treeSer =
    objTreeSerialized.treeSer + currentNode.value + ";";
    
    if (currentNode.children.length == 0) {
        objTreeSerialized.treeSer = objTreeSerialized.treeSer + "/;";
      return;
    }

    for (const currentChild of currentNode.children) {
     /*  objTreeSerialized.treeSer =
        objTreeSerialized.treeSer + currentChild.value + ";"; */
      this.buildSerialized(objTreeSerialized, currentChild);
    }

    objTreeSerialized.treeSer = objTreeSerialized.treeSer + "/;";
  }

  deserialize(serializedTree) {
      this.root = "DELETED";

    let tokens = serializedTree.split(";");
    if (tokens[tokens.length - 1] == "") {
      tokens.pop();
    }
    /* this.buildTree(tokens, this.root); */
    let mamada = this.buildTree2(tokens);
    this.root = mamada;
  }
  buildTree2(tokens) {
    let currentToken = tokens.shift();

    if(tokens.length == 0) return null;

    if(currentToken == "/") return null;

    let newNode = new Node(currentToken);
    let tempNode = null;
    while(true){
        tempNode = this.buildTree2(tokens);
        if(tempNode != null)
            newNode.children[newNode.children.length] = tempNode;
        else
            break;
    }

    return newNode;
  }

  /* The widthest part of the tree */
  getLeafsCount(nodeNav = this.root, count = 0) {
    if (nodeNav.children.length == 0) {
      return 1;
    }

    let subTreeSum = 0;
    for (let currentChild of nodeNav.children) {
      subTreeSum = subTreeSum + this.getLeafsCount(currentChild, subTreeSum);
    }
    return subTreeSum;
  }
  getTreeHeight(nodeNav = this.root, currentBranchDeep = 0, heighestDeep = 0) {
    /*  
    if (nodeNav.children.length == 0) 
     return heighestDeep>currentBranchDeep?heighestDeep:currentBranchDeep;  */

    /* let branchSum = 0; */
    let tempSum = 0;

    for (let currentChild of nodeNav.children) {
      tempSum = this.getTreeHeight(
        currentChild,
        currentBranchDeep + 1,
        heighestDeep
      );
      if (tempSum > heighestDeep /* branchSum */) {
        heighestDeep /* branchSum */ = tempSum;
      }
    }

    return heighestDeep > currentBranchDeep ? heighestDeep : currentBranchDeep;
  }

  buildTree(tokens, currentNode) {
    let currentToken = tokens.shift();

    if (tokens.length == 0 || currentToken === "/") {
      return false;
    }

    let newNode = new Node(currentToken);
    if (this.root == null) {
      currentNode = newNode;
      this.root = newNode;
    } else {
      currentNode.children[currentNode.children.length] = newNode;
    }

    while (this.buildTree(tokens, newNode)) {}

    return true;
  }
}
