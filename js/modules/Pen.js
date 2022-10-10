export class Pen{

    constructor(){
        this.color = 'black';
        this.size = 1;
    }
    setColor(color){
        this.color =  color;
    }
    getColor(){
        return this.color
    }
    setSize(size){
        this.size =  size;
    }
    getSize(){
        return this.size
    }
}