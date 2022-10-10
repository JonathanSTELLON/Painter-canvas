import { Pen } from "./Pen.js";

export class Slate{

    constructor(pen){

        this.pen = pen;
        this.isDrawing = false;
        this.x = 0;
        this.y = 0;
        this.canvas = document.getElementById('painter');
        this.context = this.canvas.getContext('2d');
        
        this.installEventHandlers();
        this.whiteBg();
    }

    installEventHandlers(){

        document.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));

        const refresh =  document.getElementById('refresh');
        refresh.addEventListener('click', this.refreshCanva.bind(this));
    }

    onMouseDown(e){
        this.x = e.offsetX;
        this.y = e.offsetY;
        this.isDrawing = true;
    }

    onMouseMove(e){
        if (this.isDrawing === true){
            this.drawLine(this.context, this.x, this.y, e.offsetX, e.offsetY);
            this.x = e.offsetX;
            this.y = e.offsetY;
        }
    }

    onMouseUp(e){
        if (this.isDrawing === true){
            this.drawLine(this.context, this.x, this.y, e.offsetX, e.offsetY);
            this.x = 0;
            this.y = 0;
            this.isDrawing = false;
        }
    }

    whiteBg(){
        this.context.fillStyle = "#FFFFFF";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    refreshCanva(){
        this.whiteBg();
    }

    drawLine(context, x1, y1, x2, y2){
        this.context.beginPath();
        this.context.strokeStyle = this.pen.color;
        this.context.lineWidth = this.pen.size;
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
        this.context.closePath();
    }
}

