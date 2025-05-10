import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { PraharInfo } from '@/data/quizData';
import styles from '@/styles/ShareableResult.module.css';

interface ShareableResultProps {
  praharInfo: PraharInfo;
}

const ShareableResult: React.FC<ShareableResultProps> = ({ praharInfo }) => {
  const resultCardRef = useRef<HTMLDivElement>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showScreenshotInstructions, setShowScreenshotInstructions] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    // Get base URL for sharing
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const generateImage = async (): Promise<string | null> => {
    if (!resultCardRef.current) return null;
    
    try {
      setIsGenerating(true);
      
      // Create a clone of the card to modify without affecting the original
      const originalCard = resultCardRef.current;
      const clonedCard = originalCard.cloneNode(true) as HTMLElement;
      
      // Temporarily add the clone to the DOM but make it invisible
      clonedCard.style.position = 'absolute';
      clonedCard.style.left = '-9999px';
      clonedCard.style.top = '-9999px';
      document.body.appendChild(clonedCard);
      
      // Fix all gradient text elements in the clone
      const gradientElements = clonedCard.querySelectorAll('[class*="praharName"], [class*="logo"], [class*="title"]');
      gradientElements.forEach((el) => {
        // Force solid color text instead of gradient
        (el as HTMLElement).style.background = 'none';
        (el as HTMLElement).style.webkitBackgroundClip = 'unset';
        (el as HTMLElement).style.backgroundClip = 'unset';
        (el as HTMLElement).style.webkitTextFillColor = 'white';
        (el as HTMLElement).style.color = 'white';
        (el as HTMLElement).style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.5)';
      });
      
      // Capture the modified clone
      const canvas = await html2canvas(clonedCard, {
        scale: 2, // Higher resolution
        backgroundColor: null,
        logging: false,
        useCORS: true,
        allowTaint: true,
        onclone: (clonedDoc) => {
          // Additional fixes that might be needed in the cloned document
          const clonedElements = clonedDoc.querySelectorAll('[class*="praharName"], [class*="logo"], [class*="title"]');
          clonedElements.forEach((el) => {
            (el as HTMLElement).style.background = 'none';
            (el as HTMLElement).style.color = 'white';
            (el as HTMLElement).style.webkitTextFillColor = 'white';
          });
        }
      });
      
      // Remove the clone from the DOM
      document.body.removeChild(clonedCard);
      
      // Create the image data
      const dataUrl = canvas.toDataURL('image/png');
      setGeneratedImageUrl(dataUrl);
      setIsGenerating(false);
      return dataUrl;
    } catch (error) {
      console.error('Error generating image:', error);
      setIsGenerating(false);
      return null;
    }
  };

  const saveAndRedirectToInstagram = async () => {
    // Generate the image first to make sure it's ready for screenshot
    if (!generatedImageUrl) {
      await generateImage();
    }
    
    // Show instructions and immediately scroll to the very top
    setShowScreenshotInstructions(true);
    
    // Use setTimeout to ensure the modal is rendered before scrolling
    setTimeout(() => {
      // Force scroll to absolute top of page
      window.scrollTo(0, 0);
      
      // Also try scrolling the document body and html element
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    }, 50);
  };

  const redirectToInstagram = () => {
    // Redirect to Instagram
    const instagramUrl = 'https://www.instagram.com/';
    window.open(instagramUrl, '_blank');
  };

  const shareToWhatsApp = async () => {
    // Generate the image if not already generated
    const imageUrl = generatedImageUrl || await generateImage();
    
    if (!imageUrl) {
      alert('Failed to generate image. Please try again.');
      return;
    }
    
    const shareMessage = `I discovered my Prahar personality type: ${praharInfo.name}! Take the quiz to find yours: ${baseUrl}`;
    const imageName = `My-Prahar-Type-${praharInfo.name.replace(/\s+/g, '-')}.png`;

    try {
      // Try to use Web Share API (modern browsers & mobile)
      if (navigator.share && navigator.canShare) {
        // Convert base64 data URL to a blob
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], imageName, { type: 'image/png' });
        
        // Check if we can share files
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'My Prahar Personality Type',
            text: shareMessage
          });
          return; // Successfully shared with Share API
        }
      }
    } catch (error) {
      console.error('Error using Web Share API:', error);
      // Fall back to download + WhatsApp URL approach
    }
    
    // Fallback: Save the image and open WhatsApp with text
    try {
      // First save the image to device
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = imageName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Then open WhatsApp
      setTimeout(() => {
        const whatsappMessage = shareMessage + '\n\n(Please attach the image I just downloaded to share your result card)';
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
      }, 500); // Small delay to ensure download starts first

      alert('Image saved! Please attach it to your WhatsApp message to share the complete card.');
    } catch (error) {
      console.error('Error with fallback sharing method:', error);
      alert('There was a problem sharing to WhatsApp. Please try again.');
    }
  };

  const closeInstructions = () => {
    setShowScreenshotInstructions(false);
  };
  
  const downloadImage = async () => {
    const imageUrl = generatedImageUrl || await generateImage();
    
    if (!imageUrl) {
      alert('Failed to generate image. Please try again.');
      return;
    }
    
    // Create a temporary link element to download the image
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `My-Prahar-Type-${praharInfo.name.replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Image saved to your device! You can share it on any platform you like.');
  };

  return (
    <div className={styles.shareableContainer}>
      {/* Screenshot instructions overlay */}
      {showScreenshotInstructions && (
        <div className={styles.screenshotOverlay}>
          <div className={styles.screenshotInstructions}>
            <h3>Take a Screenshot Now</h3>
            <p>1. Take a screenshot of the result card below</p>
            <p>2. Click the "Open Instagram" button</p>
            <p>3. Create a new story and upload your screenshot</p>
            <p>4. Add the link sticker with "prahar-quiz.com"</p>
            <div className={styles.instructionButtons}>
              <button onClick={closeInstructions} className={styles.closeButton}>Close</button>
              <button onClick={redirectToInstagram} className={styles.instagramButton}>
                Open Instagram
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Result card that will be captured as an image */}
      <div className={styles.shareableCard} ref={resultCardRef}>
        <div className={styles.cardHeader}>
          <div className={styles.logo}>Prahar Quiz</div>
          <div className={styles.resultTitle}>My Personality Type</div>
        </div>
        
        <div className={styles.resultContent}>
          <div className={styles.praharName}>{praharInfo.name}</div>
          <div className={styles.praharDescription}>
            {praharInfo.description.length > 200 
              ? `${praharInfo.description.substring(0, 200)}...` 
              : praharInfo.description}
          </div>
        </div>
        
        <div className={styles.cardFooter}>
          <div className={styles.websiteUrl}>{baseUrl || 'prahar-quiz.com'}</div>
        </div>
      </div>
      
      <div className={styles.shareButtonsContainer}>
        {/* Screenshot + Instagram Button */}
        <button 
          className={`${styles.shareStoryButton} ${styles.instagramScreenshotButton}`}
          onClick={saveAndRedirectToInstagram}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <div className={styles.loadingSpinner}></div>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={styles.shareIcon}>
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
              </svg>
              Screenshot for Instagram
            </>
          )}
        </button>
        
        {/* WhatsApp Share Button */}
        <button 
          className={`${styles.shareStoryButton} ${styles.whatsappButton}`}
          onClick={shareToWhatsApp}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <div className={styles.loadingSpinner}></div>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={styles.shareIcon}>
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
              </svg>
              Share to WhatsApp
            </>
          )}
        </button>
        
        {/* Save image button */}
        <button 
          className={`${styles.shareStoryButton} ${styles.downloadButton}`}
          onClick={downloadImage}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <span>Generating...</span>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={styles.shareIcon}>
                <path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/>
              </svg>
              Download Image
            </>
          )}
        </button>
      </div>
      
      <div className={styles.shareInstructions}>
        <p>"Screenshot for Instagram" will show instructions for taking a screenshot and redirect you to Instagram.</p>
      </div>
    </div>
  );
};

export default ShareableResult;
