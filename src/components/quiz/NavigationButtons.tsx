import React from 'react';
import styles from '@/styles/NavigationButtons.module.css';

interface NavigationButtonsProps {
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  onNext,
  onPrev,
  onSubmit
}) => {
  const isFirstQuestion = currentQuestion === 1;
  const isLastQuestion = currentQuestion === totalQuestions;
  const isAnswerSelected = selectedAnswer !== null;

  return (
    <div className={styles.navigationContainer}>
      {!isFirstQuestion && (
        <button 
          className={`${styles.navigationButton} ${styles.prevButton}`}
          onClick={onPrev}
        >
          Previous
        </button>
      )}
      
      {isLastQuestion ? (
        <button 
          className={`${styles.navigationButton} ${styles.submitButton}`}
          onClick={onSubmit}
          disabled={!isAnswerSelected}
        >
          Submit
        </button>
      ) : (
        <button 
          className={`${styles.navigationButton} ${styles.nextButton}`}
          onClick={onNext}
          disabled={!isAnswerSelected}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
