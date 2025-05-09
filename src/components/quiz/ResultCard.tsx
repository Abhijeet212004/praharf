import React from 'react';
import { PraharInfo } from '@/data/quizData';
import styles from '@/styles/ResultCard.module.css';

interface ResultCardProps {
  praharInfo: PraharInfo;
  onRetake: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ praharInfo, onRetake }) => {
  return (
    <div className={styles.resultCard}>
      <h2 className={styles.resultTitle}>Your Prahar Type</h2>
      
      <div className={styles.praharName}>
        {praharInfo.name}
      </div>
      
      <div className={styles.praharDescription}>
        {praharInfo.description}
      </div>
      
      <button className={styles.retakeButton} onClick={onRetake}>
        Retake Quiz
      </button>
    </div>
  );
};

export default ResultCard;
