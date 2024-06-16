class FlashcardAnimation {    
    constructor() {
        this.flashCard = document.getElementById("flashcard");
        this.flashCardFilter = document.getElementById("flashcard__filter");
        this.flashCard.addEventListener("animationend", this.cleanClassList, {once: false});
    }

    setUpAnimation() {
        this.flashCard.style.pointerEvents = "none";
    }

    spawn() {        
        this.setUpAnimation();
        this.flashCard.classList.add("spawn-animation");
    }
    
    wrongAnswer(animationEndCallback) {
        this.setUpAnimation();
        this.flashCard.classList.add("wrong-animation");
        this.flashCard.addEventListener("animationend", () => this.animationEnd(animationEndCallback), {once: true} );            
    
        this.flashCardFilter.classList.add("wrong-animation-filter");        
    }
    
    correctAnswer(animationEndCallback) {
        this.setUpAnimation();
        this.flashCard.classList.add("correct-animation");
        this.flashCard.addEventListener("animationend", () => this.animationEnd(animationEndCallback), {once: true} );
    
        this.flashCardFilter.classList.add("correct-animation-filter");
    }
    
    cleanClassList () {
        const flashCard = document.getElementById("flashcard");
        const flashCardFilter = document.getElementById("flashcard__filter");
        
        flashCard.style.pointerEvents = "all";
        flashCard.classList.remove("wrong-animation");
        flashCard.classList.remove("correct-animation");
        flashCard.classList.remove("spawn-animation");
        flashCardFilter.classList.remove("wrong-animation-filter");
        flashCardFilter.classList.remove("correct-animation-filter");
    }
    
    animationEnd(callback) {
        callback();
    }
}


export default FlashcardAnimation