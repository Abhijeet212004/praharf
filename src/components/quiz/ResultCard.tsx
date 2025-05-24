import React, { useEffect, useState } from 'react';
import { PraharInfo } from '@/data/quizData';
import styles from '@/styles/ResultCard.module.css';
import Image from 'next/image';
import ShareableResult from './ShareableResult';

// Import custom prahar card images
import praharCard1 from '@/assets/praharcard1.jpeg';
import praharCard2 from '@/assets/praharcard2.jpeg';
import praharCard3 from '@/assets/praharcard3.jpeg';
import praharCard4 from '@/assets/praharcard4.jpeg';
import praharCard5 from '@/assets/praharcard5.jpeg';
import praharCard6 from '@/assets/praharcard6.jpeg';
import praharCard7 from '@/assets/praharcard7.jpeg';
import praharCard8 from '@/assets/praharcard8.jpeg';

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
  
  // Get the appropriate card image based on prahar id
  const getPraharCard = () => {
    switch(praharInfo.id) {
      case 1: return praharCard1;
      case 2: return praharCard2;
      case 3: return praharCard3;
      case 4: return praharCard4;
      case 5: return praharCard5;
      case 6: return praharCard6;
      case 7: return praharCard7;
      case 8: return praharCard8;
      default: return praharCard1;
    }
  };
  
  // No longer needed as these functions are now in ShareableResult component

  return (
    <div className={styles.resultCard}>
      <div className={styles.cardImageContainer}>
        <img 
          src={getPraharCard().src} 
          alt={`${praharInfo.name} card`} 
          className={styles.praharCardImage} 
        />
      </div>
      
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
