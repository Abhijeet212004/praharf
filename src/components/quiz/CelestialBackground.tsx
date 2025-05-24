import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/CelestialBackground.module.css';

// Import Prahar background images
import prahar1Bg from '@/assets/prahar1.jpeg';
import prahar2Bg from '@/assets/prahar2.jpeg';
import prahar3Bg from '@/assets/prahar3.jpeg';
import prahar4Bg from '@/assets/prahar4.jpeg';
import prahar5Bg from '@/assets/prahar5.jpeg';
import prahar6Bg from '@/assets/prahar6.jpeg';
import prahar7Bg from '@/assets/prahar7.jpeg';
import prahar8Bg from '@/assets/prahar8.jpeg';

interface CelestialBackgroundProps {
  progress: number;
  showResult?: boolean;
  resultPraharId?: number | null;
}

const CelestialBackground: React.FC<CelestialBackgroundProps> = ({ progress, showResult = false, resultPraharId = null }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<NodeListOf<HTMLDivElement> | null>(null);


  useEffect(() => {
    if (starsContainerRef.current) {
      const starsContainer = starsContainerRef.current;
      

      starsContainer.innerHTML = '';
      

      for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = styles.star;
        
        if (Math.random() > 0.7) star.classList.add(styles.withRays);
        
        const size = 1 + Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 50}%`; // Stars mostly in upper half
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        starsContainer.appendChild(star);
      }
    }
    

    if (containerRef.current) {
      cloudsRef.current = containerRef.current.querySelectorAll(`.${styles.cloud}`);
    }
  }, []);


  useEffect(() => {
    if (showResult && resultPraharId) {
      // If showing result, set the background based on the prahar ID
      updateBackgroundForPraharResult(resultPraharId);
    } else {
      // Otherwise use the normal progress-based background
      updateCelestialElements(progress);
    }
  }, [progress, showResult, resultPraharId]);

  // Function to update background for result page based on prahar ID
  const updateBackgroundForPraharResult = (praharId: number) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Hide celestial elements for the result page
    if (sunRef.current) sunRef.current.style.opacity = '0';
    if (moonRef.current) moonRef.current.style.opacity = '0';
    if (cloudsRef.current) {
      cloudsRef.current.forEach(cloud => {
        cloud.style.opacity = '0';
      });
    }
    if (starsContainerRef.current) {
      const stars = starsContainerRef.current.querySelectorAll(`.${styles.star}`);
      stars.forEach(star => {
        (star as HTMLElement).style.opacity = '0';
      });
    }
    
    // Set background image based on prahar ID
    let backgroundImage;
    switch(praharId) {
      case 1: backgroundImage = `url(${prahar1Bg.src})`; break;
      case 2: backgroundImage = `url(${prahar2Bg.src})`; break;
      case 3: backgroundImage = `url(${prahar3Bg.src})`; break;
      case 4: backgroundImage = `url(${prahar4Bg.src})`; break;
      case 5: backgroundImage = `url(${prahar5Bg.src})`; break;
      case 6: backgroundImage = `url(${prahar6Bg.src})`; break;
      case 7: backgroundImage = `url(${prahar7Bg.src})`; break;
      case 8: backgroundImage = `url(${prahar8Bg.src})`; break;
      default: backgroundImage = `url(${prahar1Bg.src})`;
    }
    
    // Apply the background image
    container.style.backgroundImage = backgroundImage;
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
    container.style.backgroundColor = 'transparent';
  };

  const updateCelestialElements = (progress: number) => {

    if (!sunRef.current || !moonRef.current || !cloudsRef.current) return;
    

    const sun = sunRef.current;
    let sunTopPosition: number, sunLeftPosition: number;
    
    if (progress < 0.25) {

      sunTopPosition = 120 - (progress / 0.25) * 90;
      sunLeftPosition = 10;
      sun.style.boxShadow = '0 0 70px rgba(255,177,71,0.8)';
    } else if (progress < 0.7) {
      sunTopPosition = 30;

      const noonProgress = (progress - 0.25) / 0.45;
      sunLeftPosition = 10 + noonProgress * 80;
      sun.style.boxShadow = '0 0 100px rgba(255,177,71,0.9)';
    } else {

      const eveningProgress = (progress - 0.7) / 0.3;
      sunTopPosition = 30 + eveningProgress * 90;
      sunLeftPosition = 90;
      sun.style.boxShadow = '0 0 70px rgba(255,177,71,0.8)';
    }
    
    sun.style.top = `${sunTopPosition}%`;
    sun.style.left = `${sunLeftPosition}%`;
    

    const moon = moonRef.current;
    let moonTopPosition, moonOpacity;
    
    if (progress < 0.6) {
      moonTopPosition = 120;
      moonOpacity = 0;
    } else {

      const nightProgress = (progress - 0.6) / 0.4;
      moonTopPosition = 120 - nightProgress * 90;
      moonOpacity = Math.min(nightProgress * 1.5, 1);
    }
    
    moon.style.top = `${moonTopPosition}%`;
    moon.style.opacity = String(moonOpacity);
    

    const clouds = cloudsRef.current;
    let cloudOpacity: number;
    
    if (progress < 0.2) {
      cloudOpacity = progress * 5;
    } else if (progress < 0.7) {
      cloudOpacity = 1;
    } else {
      cloudOpacity = 1 - (progress - 0.7) * 3.33;
      cloudOpacity = Math.max(cloudOpacity, 0);
    }
    
    clouds.forEach((cloud, index) => {
      cloud.style.opacity = String(cloudOpacity);

      const moveX = Math.sin(progress * Math.PI * 2 + index) * 5;
      cloud.style.transform = `translateX(${moveX}px)`;
    });
    

    if (starsContainerRef.current) {
      const stars = starsContainerRef.current.querySelectorAll(`.${styles.star}`);
      let starOpacity: number;
      
      if (progress < 0.5) {
        starOpacity = 0;
      } else {
        starOpacity = (progress - 0.5) * 2;
        starOpacity = Math.min(starOpacity, 1);
      }
      
      stars.forEach(star => {
        (star as HTMLElement).style.opacity = String(starOpacity);
      });
    }
    

    if (containerRef.current) {
      if (progress < 0.25) {
        containerRef.current.style.backgroundColor = '#243665';
        containerRef.current.style.backgroundImage = 'linear-gradient(to top, #f7b05c 0%, #6e4e8e 35%, #243665 100%)';
      } else if (progress < 0.5) {
        containerRef.current.style.backgroundColor = '#1c7fee';
        containerRef.current.style.backgroundImage = 'linear-gradient(to top, #f8c254 0%, #90d0ff 35%, #1c7fee 100%)';
      } else if (progress < 0.75) {
        containerRef.current.style.backgroundColor = '#5932be';
        containerRef.current.style.backgroundImage = 'linear-gradient(to top, #e65c00 0%, #8446bd 35%, #5932be 100%)';
      } else {
        containerRef.current.style.backgroundColor = '#0f1642';
        containerRef.current.style.backgroundImage = 'linear-gradient(to top, #381c59 0%, #192052 35%, #0f1642 100%)';
      }
    }
  };

  return (
    <div className={styles.skyContainer} ref={containerRef}>
      <div className={styles.sun} ref={sunRef}></div>
      <div className={styles.moon} ref={moonRef}></div>
      

      <div className={`${styles.cloud} ${styles.cloud1}`}>
        <div className={styles.cloudBase} style={{width:'100%', height:'60%'}}></div>
        <div className={styles.cloudPuff} style={{width:'45%', height:'90%', top:'-50%', left:'10%'}}></div>
        <div className={styles.cloudPuff} style={{width:'55%', height:'100%', top:'-60%', left:'40%'}}></div>
        <div className={styles.cloudPuff} style={{width:'40%', height:'80%', top:'-40%', right:'10%'}}></div>
      </div>
      
      <div className={`${styles.cloud} ${styles.cloud2}`}>
        <div className={styles.cloudBase} style={{width:'100%', height:'50%'}}></div>
        <div className={styles.cloudPuff} style={{width:'40%', height:'80%', top:'-40%', left:'5%'}}></div>
        <div className={styles.cloudPuff} style={{width:'50%', height:'90%', top:'-50%', left:'35%'}}></div>
        <div className={styles.cloudPuff} style={{width:'35%', height:'70%', top:'-30%', right:'15%'}}></div>
      </div>
      
      <div className={`${styles.cloud} ${styles.cloud3}`}>
        <div className={styles.cloudBase} style={{width:'100%', height:'55%'}}></div>
        <div className={styles.cloudPuff} style={{width:'50%', height:'100%', top:'-60%', left:'0%'}}></div>
        <div className={styles.cloudPuff} style={{width:'60%', height:'110%', top:'-70%', left:'35%'}}></div>
        <div className={styles.cloudPuff} style={{width:'45%', height:'90%', top:'-50%', right:'5%'}}></div>
      </div>
      

      <div className={styles.starsContainer} ref={starsContainerRef}></div>
    </div>
  );
};

export default CelestialBackground;
