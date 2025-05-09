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
  return (
    <div className={styles.questionCard}>
      <h2 className={styles.questionText}>{question.question}</h2>
      
      <div className={styles.optionsList}>
        {question.options.map((option, index) => (
          <div 
            key={index}
            className={`${styles.optionItem} ${selectedAnswer === index ? styles.selected : ''}`}
            onClick={() => onAnswerSelect(index)}
          >
            <div className={styles.optionLetter}>
              {['A', 'B', 'C', 'D'][index]}
            </div>
            <div className={styles.optionText}>{option}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
