import { useEffect, useState } from "react";
import { FlashCard, SettingsMenu } from "../../components";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import "./index.scss";
import usersService from "../../services/usersService";

const Play = ({nouns}) => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [noun, setNoun] = useState(null);
  const [flashcardAnimation, setFlashcardAnimation] = useState("");
  const [playConfettiAnimation, setPlayConfettiAnimation] = useState(false);
  const { width, height } = useWindowSize();
  const [config, setConfig] = useState({
    disableAnimations: false,
    hideNounGroup: false
  });

  let correctAudio = new Audio("/sound/correct_answer.mp3");
  correctAudio.volume = 0.7;
  let wrongAudio = new Audio("/sound/wrong_answer.mp3");
  wrongAudio.volume = 0.7;
  let highScoreAudio = new Audio("/sound/high_score.mp3");
  highScoreAudio.volume = 0.7;

  const getRandomNoun = () => {    
    const randomIndex = Math.floor(Math.random() * nouns.length);
    setNoun(nouns[randomIndex]);
    setFlashcardAnimation("spawn-animation");
  };

  const getServerScore = async () => {
    const token = window.localStorage.getItem("user-token");
    if (token !== null) {
      const response = await usersService.getUserScore(token);
      window.localStorage.setItem("high_score", response);
      setHighScore(response);
      return;
    }

    const highScoreLocal = window.localStorage.getItem("high_score");
    if (!highScoreLocal) return;
    setHighScore(highScoreLocal);
  };

  useEffect(() => {
    getServerScore();    
  }, []);

  useEffect(() => {
    getRandomNoun();
  }, [score, nouns]);

  const onAnswerSubmit = (answer) => {
    if (answer !== noun.gender) {
      return setFlashcardAnimation("wrong-animation");
    }
    setFlashcardAnimation("correct-animation");
  };

  const updateHighScore = async () => {
    const token = window.localStorage.getItem("user-token");
    if (token !== null) {
      const response = await usersService.updateScore(token, score);
      console.log(response);
    }
  };

  const onFlashcardAnimationEnd = () => {
    switch (flashcardAnimation) {
      case "correct-animation":
        setFlashcardAnimation("spawn-animation");
        setScore(score + 1);

        if (score + 1 <= highScore) return;

        window.localStorage.setItem("high_score", score + 1);
        if (
          playConfettiAnimation === "played" ||
          score + 1 === 1 ||
          playConfettiAnimation === "playing"
        )
          return;
        
        setPlayConfettiAnimation("playing");
        setTimeout(() => highScoreAudio.play(), 300);
        setTimeout(() => {
          setPlayConfettiAnimation("played");
        }, 3000);
        break;
      case "wrong-animation":
        updateHighScore();
        setFlashcardAnimation("spawn-animation");
        setPlayConfettiAnimation(false);
        setScore(0);
        if (score === 0) return getRandomNoun();
        if (score <= highScore) return;
        setHighScore(score);
        window.localStorage.setItem("high_score", score);
        break;
      default:
        return;
    }
  };

  const onFlashcardAnimationStart = () => {
    if (flashcardAnimation === "correct-animation") return correctAudio.play();
    if (flashcardAnimation === "wrong-animation") wrongAudio.play();
  };

  return (
    <section>
      <SettingsMenu 
        changeConfig={(newConfig) => setConfig(newConfig)}
        currentConfig={config}
      />

      <div className="game-container">
        <div className="score-container">
          <div className="high-score">Hi. Score: {highScore}</div>
          <div
            className={`score rainbow ${
              score >= 10 ? "rainbow_text_animated" : ""
            }`}
          >
            Score: {score}
          </div>
        </div>
        {noun !== null && noun !== undefined && (
          <FlashCard
            noun={noun.name}
            nounGroup={noun.group}            
            submitAnswer={onAnswerSubmit}

            flashcardAnimationClass={flashcardAnimation}
            onAnimationEnd={onFlashcardAnimationEnd}
            onAnimationStart={onFlashcardAnimationStart}
            
            config={config}
          />
        )}
      </div>
      {playConfettiAnimation === "playing" && (
        <Confetti width={width} height={height} gravity={0.15} />
      )}
    </section>
  );
};

export default Play;
