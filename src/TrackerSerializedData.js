export default class TrackerSerializedData {
  constructor(stringToTrack, nodeMarker, branchMarker) {
    this.NODEMARKER = nodeMarker;
    this.BRANCHMARKER = branchMarker;

    this.stringToTrack = stringToTrack;

    this.currentIndex = 0;
  }

  getNextToken() {
    if (this.currentIndex >= this.stringToTrack.length) return null;

    if (this.stringToTrack.charAt(this.currentIndex) === this.BRANCHMARKER) {
      this.currentIndex++;
      return this.BRANCHMARKER;
    }

    let nodeEndIndex = this.stringToTrack.indexOf(this.NODEMARKER,this.currentIndex);
    let token =  this.stringToTrack.substring(this.currentIndex,nodeEndIndex);
    this.currentIndex = nodeEndIndex +1 ;

    return token;
  }
  getNextTokenNel() {
    if (this.currentIndex >= this.stringToTrack.length) return null;
    //if indexx == -1 means that wasnt found or the current index is outOfBounds the array's length.
    let indexSemiColon = this.stringToTrack.indexOf(";", this.currentIndex);
    let indexSlash = this.stringToTrack.indexOf("/", this.currentIndex);

    let indexEndToken;

    //if the semiColon wasnt found, then the nex token will be from -1 to indexSlash, that'd never happens,
    //
    if (indexSemiColon == -1) {
      indexEndToken = indexSlash + 1;
    } else {
      indexEndToken =
        indexSemiColon < indexSlash ? indexSemiColon : indexSlash + 1;
    }

    //return de nextToken and the substring cuted por the new iteration.
    let valueNode = this.stringToTrack.substring(
      this.currentIndex,
      /* indexSemiColon < indexSlash ? indexSemiColon : indexSlash + 1 */
      indexEndToken
    );

    //this.moveCursorTo(indexSemiColon < indexSlash ? indexSemiColon + 1 : indexSlash + 1)
    this.moveCursorTo(indexEndToken + 1);

    return valueNode;
  }

  moveCursorTo(index) {
    this.currentIndex = index;
  }


}
