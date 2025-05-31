import React from 'react';
import styles from '@/styles/QuestionCard.module.css';
import { Question } from '@/data/quizData';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
  questionNumber?: number;
  totalQuestions?: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect,
  questionNumber = 1,
  totalQuestions = 10
}) => {
  // Determine if we should use white text styling (for questions 1-3 and after question 5)
  const useWhiteText = questionNumber <= 3 || questionNumber > 5;
  
  return (
    <>
      <h2 className={`${styles.questionText} ${useWhiteText ? styles.whiteText : ''}`}>
        {question.question}
      </h2>
      
      <div className={styles.optionsList}>
        {question.options.map((option, index) => (
          <div 
            key={index}
            className={`
              ${styles.optionItem} 
              ${selectedAnswer === index ? styles.selected : ''}
              ${useWhiteText ? styles.whiteOption : ''}
            `}
            onClick={() => onAnswerSelect(index)}
          >
            <div className={`${styles.optionLetter} ${useWhiteText ? styles.whiteLetter : ''}`}>
              {['A', 'B', 'C', 'D'][index]}
            </div>
            <div className={`${styles.optionText} ${useWhiteText ? styles.whiteText : ''}`}>
              {option}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default QuestionCard;
