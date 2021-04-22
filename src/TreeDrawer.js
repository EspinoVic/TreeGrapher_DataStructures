export default class TreeDrawer{
    constructor(/* leafsCount,levelsDeep */){
        /* this.canvasWidth = (80 * leafsCount) +( 30*leafsCount-1);
        this.canvasHeight = (80 * levelsDeep) + (30*levelsDeep-1); */

        this.widthNode = 80;
        this.heightNode = 40;

        this.offsetYForDrawing = 0 + (this.heightNode) ;
        this.offsetXForDrawing = 0 + 10;

        this.circleDiameterNodeIndicator = 10;
        this.linkerLineLengthNodeIndicator = 30;
    }

    makeDraw(context,tree){
        context.imageSmoothingEnabled = false;
        context.lineWidth = "2";        

        this.goThroughTree(context,tree.root)

    }

    goThroughTree(context, treeNode){
        this.drawNode(treeNode.value,context)
        
        let localOffsetX = this.offsetXForDrawing;
        let localOffsetY = this.offsetYForDrawing;

        for(const currentChild of treeNode.children){
            this.goThroughTree(context,currentChild)
            this.offsetXForDrawing = localOffsetX;

        }
    }
    /* draw child but the first node doesnt, so it's needed other approach */
/*     goThroughTreeNel(context, treeNode){

        let localOffsetX = this.offsetXForDrawing;
        let localOffsetY = this.offsetYForDrawing;
        for(const currentChild of treeNode.children){
            this.drawNode(currentChild.value,context)
            this.offsetXForDrawing = localOffsetX;

        }
    } */

    drawNode(textToWrite,ctx){

        /* Draw Cicle node indicator- */
        ctx.fillStyle = "blue";        
        ctx.arc( this.offsetXForDrawing, this.offsetYForDrawing,this.circleDiameterNodeIndicator,0, 2*Math.PI)
        ctx.fill()
        this.offsetXForDrawing = this.offsetXForDrawing + this.circleDiameterNodeIndicator;

        /* Draw Line to connect indicator to node */
        ctx.beginPath();
        ctx.moveTo(this.offsetXForDrawing, this.offsetYForDrawing);
        ctx.lineTo(this.offsetXForDrawing + this.linkerLineLengthNodeIndicator, this.offsetYForDrawing);
        ctx.stroke();
        ctx.closePath();

        this.offsetXForDrawing = this.offsetXForDrawing + this.linkerLineLengthNodeIndicator;

        /* Draw the node */
        ctx.fillStyle = "black";
        ctx.strokeRect(this.offsetXForDrawing,this.offsetYForDrawing-(this.heightNode/2),this.widthNode,this.heightNode);        
        

        /* Draw text node */
        ctx.fillStyle = "red";
        ctx.font = "18px Arial";
        ctx.fillText(textToWrite,this.offsetXForDrawing+2,this.offsetYForDrawing);

        this.offsetXForDrawing = this.offsetXForDrawing + this.widthNode;
        this.offsetYForDrawing = this.offsetYForDrawing + this.heightNode +5;

    }


}