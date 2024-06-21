import { useEffect, useState } from "react";
import nounService from "../../services/nounService";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { FlashCard } from "../../components";

const Play = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [noun, setNoun] = useState(null);
  const [flashcardAnimation, setFlashcardAnimation] = useState("");
  const [playConfettiAnimation, setPlayConfettiAnimation] = useState(false);
  const { width, height } = useWindowSize();

  let correctAudio = new Audio("/sound/correct_answer.mp3");
  correctAudio.volume = 0.7;
  let wrongAudio = new Audio("/sound/wrong_answer.mp3");
  wrongAudio.volume = 0.7;
  let highScoreAudio = new Audio("/sound/high_score.mp3");
  highScoreAudio.volume = 0.7;

  const fetchRandomNoun = async () => {
    const result = await nounService.getRandomNoun();
    setNoun(result.data);
    setFlashcardAnimation("spawn-animation");
  };

  useEffect(() => {
    const highScoreLocal = window.localStorage.getItem("high_score");
    if (!highScoreLocal) return;
    setHighScore(highScoreLocal);
  }, []);

  useEffect(() => {
    fetchRandomNoun();
  }, [score]);

  const onAnswerSubmit = (answer) => {
    if (answer !== noun.gender) {
      return setFlashcardAnimation("wrong-animation");
    }
    setFlashcardAnimation("correct-animation");
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
        setFlashcardAnimation("spawn-animation");
        setPlayConfettiAnimation(false);
        setScore(0);
        if (score === 0) return fetchRandomNoun();
        if (score <= highScore) return;
        setHighScore(score);
        window.localStorage.setItem("high_score", score);
        break;
      default:
        return;
    }
  };

  const onFlashcardAnimationStart = (e) => {
    switch (flashcardAnimation) {
      case "correct-animation":
      case "wrong-animation":
        if (flashcardAnimation === "correct-animation") correctAudio.play();
        else wrongAudio.play();
        e.target.classList.remove("spawn-animation");
        break;
      case "spawn-animation":
        e.target.classList.remove("correct-animation");
        e.target.classList.remove("wrong-animation");
        break;
      default:
        return;
    }
  };

  return (
    <section>
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
        {noun !== null && (
          <FlashCard
            noun={noun.name}
            nounGroup={noun.group}
            submitAnswer={onAnswerSubmit}
            flashcardAnimationClass={flashcardAnimation}
            onAnimationEnd={onFlashcardAnimationEnd}
            onAnimationStart={onFlashcardAnimationStart}
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
