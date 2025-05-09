import React from 'react';
import styles from '@/styles/ProgressBar.module.css';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentQuestion, totalQuestions }) => {
  const progress = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBarOuter}>
        <div 
          className={styles.progressBarInner} 
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className={styles.progressText}>
        {currentQuestion}/{totalQuestions}
      </div>
    </div>
  );
};

export default ProgressBar;
