import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { quizQuestions, praharInfo, questionPraharMapping } from '@/data/quizData';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import NavigationButtons from './NavigationButtons';
import ResultCard from './ResultCard';
import CelestialBackground from './CelestialBackground';
import styles from '@/styles/QuizContainer.module.css';

const QuizContainer: React.FC = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quizQuestions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [resultPraharId, setResultPraharId] = useState<number | null>(null);
  
  // Calculate progress for celestial animations (0 to 1)
  const progress = currentQuestionIndex / (quizQuestions.length - 1);
  
  // Handle selecting an answer
  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };
  
  // Navigate to next question
  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // Navigate to previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Calculate and show results
  const handleSubmit = () => {
    const praharCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
    
    // Count occurrences of each prahar based on answers
    answers.forEach((answer, index) => {
      if (answer !== null) {
        const questionNumber = index + 1;
        const mapping = questionPraharMapping[questionNumber as keyof typeof questionPraharMapping];
        
        if (mapping && answer in mapping) {
          const praharId = mapping[answer as keyof typeof mapping];
          if (typeof praharId === 'number' && praharId in praharCounts) {
            praharCounts[praharId]++;
          }
        }
      }
    });
    
    // Find prahar with highest count
    let maxCount = 0;
    let maxPraharId = 1;
    
    Object.entries(praharCounts).forEach(([praharId, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxPraharId = parseInt(praharId);
      }
    });
    
    // Set result
    setResultPraharId(maxPraharId);
    setShowResult(true);
  };
  
  // Reset quiz
  const handleRetake = () => {
    setAnswers(Array(quizQuestions.length).fill(null));
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setResultPraharId(null);
  };
  
  // Get current question
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  return (
    <div className={styles.quizContainer}>
      <CelestialBackground 
        progress={progress} 
        showResult={showResult}
        resultPraharId={resultPraharId}
      />
      
      <div className={styles.contentContainer}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <h1 className={styles.quizTitle}>Prahar Personality Quiz</h1>
          
          {!showResult && (
            <ProgressBar 
              currentQuestion={currentQuestionIndex + 1} 
              totalQuestions={quizQuestions.length} 
            />
          )}
        </div>
        
        {/* Main Content Section - Fixed Height */}
        <div className={styles.mainSection}>
          {!showResult ? (
            <QuestionCard 
              question={currentQuestion}
              selectedAnswer={answers[currentQuestionIndex]}
              onAnswerSelect={handleAnswerSelect}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={quizQuestions.length}
            />
          ) : (
            resultPraharId && (
              <ResultCard 
                praharInfo={praharInfo[resultPraharId]} 
                onRetake={handleRetake} 
              />
            )
          )}
        </div>
        
        {/* Footer Section - Fixed Position */}
        <div className={styles.footerSection}>
          {!showResult && (
            <NavigationButtons 
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={quizQuestions.length}
              selectedAnswer={answers[currentQuestionIndex]}
              onNext={handleNext}
              onPrev={handlePrevious}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;
