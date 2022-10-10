import { Pen } from "./Pen.js";
import { Slate } from "./Slate.js";

export class Painter{

    constructor(){
        this.pen = new Pen();
        this.slate = new Slate(this.pen);

        this.installEventHandlers();
    }

    installEventHandlers(){

        const colors = document.querySelectorAll('.colors>div');
        for(let i=0; i<colors.length; i++){
            let choosenColor = colors[i];
            choosenColor.addEventListener('click', this.selectColor.bind(this));
        }

        const sizes = document.querySelectorAll('.lines>div');
        for(let i=0; i<sizes.length; i++){
            let choosenSize = sizes[i];
            choosenSize.addEventListener('click', this.selectSize.bind(this));
        }

        const saveBtn = document.querySelector('.save');
        saveBtn.addEventListener('click', this.saveDraw.bind(this));

        // Gestion du click sur les miniatures
        // document.getElementById('saved-images').addEventListener('click', this.onClickThumb.bind(this));
    }

    selectColor(event){
        const color = event.currentTarget.dataset.color;
        this.pen.setColor(color);
    }

    selectSize(event){
        const size = event.currentTarget.dataset.line;
        this.pen.setSize(size);
    }

    // onClickThumb(event) {
    //     if (event.target.classList.contains('thumb')) {
    //         this.slate.drawImage(event.target.src);
    //     }
    // }

    async saveDraw(){

        // On récupère l'image tranformée depuis le canvas
        const dataImage = this.slate.canvas.toDataURL("image/png");
        
        // On ajoute un champ qu'on appelle 'image', côté PHP on aura la clé 'image' dans $_POST
        const formData = new FormData();
        formData.append('image', dataImage);

        const options = {
            method: 'POST',
            body: formData
        };
    
        const response = await fetch('save.php', options);

        // On parse le body de la réponse HTTP : c'est le nom du fichier image
        const draw = await response.text();

        // On crée un élément <img> pour afficher l'image enregistrée
        const thumbnail = document.createElement('img');
        thumbnail.setAttribute("class", "thumbnail");
        
        thumbnail.src = draw;

        // On insert l'image dans le code HTML (prévoir un élément avec l'id 'saved-images')
        document.getElementById('saved-pics').appendChild(thumbnail);
        console.log(dataImage);
        
    }
        
}
    
