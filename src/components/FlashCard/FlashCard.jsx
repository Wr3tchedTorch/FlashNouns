import "./index.scss";

const FlashCard = ({noun, nounGroup, submitAnswer, onAnimationEnd, flashcardAnimationClass, onAnimationStart}) => {
  let filterAnimationClass = flashcardAnimationClass === "" ? "" : `${flashcardAnimationClass}-filter`;  

  return (
    <div className={`flashcard shadow-drop-center ${flashcardAnimationClass}`} onAnimationEnd={onAnimationEnd} onAnimationStart={onAnimationStart}>
    <div className={`flashcard__filter ${filterAnimationClass}`}></div>
      <div className="flashcard__head shadow-drop-bottom">
        <div className="image" id="flashcard__head__image" style={{backgroundImage: `url("/groups/${nounGroup.toLowerCase()}.jpeg")`}}></div>
      </div>
      
      <div className="flashcard__title-container">
        <h1 className="title">{noun}</h1>
        <p className="subtitle">Group: {nounGroup}</p>
      </div>

      <div className="flashcard__button-container">
        <div className="masculine-button" onClick={() => submitAnswer("masculine")}>
          <span>M</span>
        </div>
        <div className="feminine-button" onClick={() => submitAnswer("feminine")}>
          <span>F</span>
        </div>
        <div className="neuter-button" onClick={() => submitAnswer("neuter")}>
          <span>N</span>
        </div>
      </div>
    </div>
  );  
};

export default FlashCard;
