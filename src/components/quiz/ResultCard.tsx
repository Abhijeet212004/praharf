import React, { useEffect, useState } from 'react';
import { PraharInfo } from '@/data/quizData';
import styles from '@/styles/ResultCard.module.css';
import Image from 'next/image';
import ShareableResult from './ShareableResult';

interface ResultCardProps {
  praharInfo: PraharInfo;
  onRetake: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ praharInfo, onRetake }) => {
  const [pageUrl, setPageUrl] = useState<string>('');
  
  useEffect(() => {
    // Get the current URL when component mounts (client-side only)
    if (typeof window !== 'undefined') {
      setPageUrl(window.location.origin);
    }
  }, []);

  // Share message template
  const shareMessage = `I discovered my Prahar personality type: ${praharInfo.name}! Take the quiz to find yours: ${pageUrl}`;
  
  // No longer needed as these functions are now in ShareableResult component

  return (
    <div className={styles.resultCard}>
      <h2 className={styles.resultTitle}>Your Prahar Type</h2>
      
      <div className={styles.praharName}>
        {praharInfo.name}
      </div>
      
      <div className={styles.praharDescription}>
        {praharInfo.description}
      </div>
      
      {/* Share section removed as it's now fully integrated in the ShareableResult component */}
      
      {/* Instagram Story Share with Image */}
      <div className={styles.storyShareSection}>
        <h3 className={styles.shareTitle}>Share to Instagram Story</h3>
        <p className={styles.shareDescription}>Save a beautiful image card with your result to share on Instagram</p>
        <ShareableResult praharInfo={praharInfo} />
      </div>
      
      <button className={styles.retakeButton} onClick={onRetake}>
        Retake Quiz
      </button>
    </div>
  );
};

export default ResultCard;
