import { FlashCard } from "./components"
import { useEffect, useState } from "react"
import nounService from "./services/nounService";
import FlashcardAnimation from "./components/FlashCard/FlashCardAnimation";
import "./global.scss";
import "./app.scss";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [noun, setNoun] = useState(null);
  let fca;

  const fetchRandomNoun = async () => {
    const result = await nounService.getRandomNoun();
    setNoun(result.data);
  }

  useEffect(() => {
    if (noun === null) return;
    fca = new FlashcardAnimation();  
    fca.spawn();
  }, [noun])

  useEffect(() => {        
    fetchRandomNoun();
  }, [score])

  const onAnswerSubmit = (answer) => {
    if (answer !== noun.gender) return handleWrongAnswer();

    fca.correctAnswer(() => {
      fca.spawn();
      setScore(score + 1);
    })
  }
  
  const handleWrongAnswer = () => {
    fca.wrongAnswer(() => {
      fca.spawn();
      if (score === 0) return fetchRandomNoun();
      setScore(0);
      if (score > highScore) setHighScore(score);
    });
  }

  return (
    <>    
      <div className="game-container">
        <div className="score-container">
          <div className="high-score">Hi. Score: {highScore}</div>
          <div className="score">Score: {score}</div>
        </div>
        { noun !== null &&
        <FlashCard
          noun={noun.name}
          nounGroup={noun.group}
          submitAnswer={onAnswerSubmit}
        />}
      </div>
    </>
  )
}

export default App
