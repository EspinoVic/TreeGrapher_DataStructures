import TrackerSerializedData from "./TrackerSerializedData";

export class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

export default class NAryTree {
  constructor() {
    this.root = new Node("ROOT TREE");
    this.trackerSerializedData = null;
  }

  buildTree(serializedTree) {
    this.trackerSerializedData = new TrackerSerializedData(
      serializedTree,
      ";",
      "/"
    );
    this.root = null;
    this.root = new Node("ROOT TREE");

    this.deserializar(this.root);
  }
  serialize() {
    let treeSerObj = { treeSer: "" };
    /* let treeSerialized = */ this.startSerialization(treeSerObj, this.root);
    return treeSerObj.treeSer;
  }

  startSerialization(treeSerObj, currentNodeNav) {
    if (currentNodeNav == null) return;
    if (currentNodeNav.children.length == 0) return;
    for (const currentChild of currentNodeNav.children) {
      treeSerObj.treeSer =
        treeSerObj.treeSer +
        currentChild.value +
        this.trackerSerializedData.NODEMARKER;
      this.startSerialization(treeSerObj, currentChild);
      console.log("ciclo alv");
    }
    treeSerObj.treeSer =
      treeSerObj.treeSer + this.trackerSerializedData.BRANCHMARKER;
    //treeSerObj.treeSer.concat(this.trackerSerializedData.BRANCHMARKER);
  }

  deserializar(currentNodeNav) {
    let nextToken = this.trackerSerializedData.getNextToken();
    if (
      nextToken == "" ||
      nextToken == null ||
      nextToken == this.trackerSerializedData.BRANCHMARKER
    ) {
      return false;
    }
    let newNode = new Node(nextToken);
    currentNodeNav.children[currentNodeNav.children.length] = newNode;
    while (this.deserializar(newNode)) {}

    return true;
  }

  /* The widthest part of the tree */
  getLeafsCount(nodeNav = this.root, count = 0) {
    let subTreeSum = 0;

    if (nodeNav.children.length == 0) {
      return 1;
    }

    for (let currentChild of nodeNav.children) {
      subTreeSum += this.getLeafsCount(currentChild, subTreeSum);
    }

    return subTreeSum;
  }
}
