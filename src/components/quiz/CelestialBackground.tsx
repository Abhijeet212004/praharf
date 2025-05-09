import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/CelestialBackground.module.css';

interface CelestialBackgroundProps {
  progress: number; // 0 to 1 representing progress through the quiz
}

const CelestialBackground: React.FC<CelestialBackgroundProps> = ({ progress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<NodeListOf<HTMLDivElement> | null>(null);

  // Create stars when the component mounts
  useEffect(() => {
    if (starsContainerRef.current) {
      const starsContainer = starsContainerRef.current;
      
      // Clear any existing stars
      starsContainer.innerHTML = '';
      
      // Create new stars
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
    
    // Get cloud elements
    if (containerRef.current) {
      cloudsRef.current = containerRef.current.querySelectorAll(`.${styles.cloud}`);
    }
  }, []);

  // Update celestial elements based on progress
  useEffect(() => {
    updateCelestialElements(progress);
  }, [progress]);

  const updateCelestialElements = (progress: number) => {
    // Make sure refs are available
    if (!sunRef.current || !moonRef.current || !cloudsRef.current) return;
    
    // Sun animation
    const sun = sunRef.current;
    let sunTopPosition: number, sunLeftPosition: number;
    
    if (progress < 0.25) { // First phase: Sun rises vertically
      // From below horizon (120%) to 30% top position
      sunTopPosition = 120 - (progress / 0.25) * 90;
      sunLeftPosition = 10; // Fixed position during rising
      sun.style.boxShadow = '0 0 70px rgba(255,177,71,0.8)';
    } else if (progress < 0.7) { // Second phase: Sun moves across sky
      sunTopPosition = 30; // Keep at peak position
      // Map 0.25-0.7 range to 10-90% left position
      const noonProgress = (progress - 0.25) / 0.45; // 0 to 1
      sunLeftPosition = 10 + noonProgress * 80;
      sun.style.boxShadow = '0 0 100px rgba(255,177,71,0.9)';
    } else { // Final phase: Sun sets
      // Map 0.7-1.0 range to 30-120% top position
      const eveningProgress = (progress - 0.7) / 0.3; // 0 to 1
      sunTopPosition = 30 + eveningProgress * 90;
      sunLeftPosition = 90; // Fixed position during setting
      sun.style.boxShadow = '0 0 70px rgba(255,177,71,0.8)';
    }
    
    sun.style.top = `${sunTopPosition}%`;
    sun.style.left = `${sunLeftPosition}%`;
    
    // Moon animation
    const moon = moonRef.current;
    let moonTopPosition, moonOpacity;
    
    if (progress < 0.6) { // During day - moon not visible
      moonTopPosition = 120; // Below horizon
      moonOpacity = 0;
    } else { // Evening/night - moon rises
      // Map 0.6-1.0 range to rising animation
      const nightProgress = (progress - 0.6) / 0.4; // 0 to 1
      moonTopPosition = 120 - nightProgress * 90;
      moonOpacity = Math.min(nightProgress * 1.5, 1);
    }
    
    moon.style.top = `${moonTopPosition}%`;
    moon.style.opacity = String(moonOpacity);
    
    // Cloud animations
    const clouds = cloudsRef.current;
    let cloudOpacity;
    
    if (progress < 0.2) { // Early morning - clouds forming
      cloudOpacity = progress * 5;
    } else if (progress < 0.7) { // Day - clouds visible
      cloudOpacity = 1;
    } else { // Evening/night - clouds fading
      cloudOpacity = 1 - (progress - 0.7) * 3.33;
      cloudOpacity = Math.max(cloudOpacity, 0);
    }
    
    clouds.forEach((cloud, index) => {
      cloud.style.opacity = String(cloudOpacity);
      // Subtle horizontal movement for clouds
      const moveX = Math.sin(progress * Math.PI * 2 + index) * 5;
      cloud.style.transform = `translateX(${moveX}px)`;
    });
    
    // Stars animation
    if (starsContainerRef.current) {
      const stars = starsContainerRef.current.querySelectorAll(`.${styles.star}`);
      let starOpacity;
      
      if (progress < 0.5) { // Morning/noon - stars not visible
        starOpacity = 0;
      } else { // Evening/night - stars appear
        starOpacity = (progress - 0.5) * 2;
        starOpacity = Math.min(starOpacity, 1);
      }
      
      stars.forEach(star => {
        (star as HTMLElement).style.opacity = String(starOpacity);
      });
    }
    
    // Background colors - transition through day/night cycle
    if (containerRef.current) {
      if (progress < 0.25) { // Dawn to morning
        containerRef.current.style.backgroundColor = '#243665';
        containerRef.current.style.backgroundImage = 'linear-gradient(to top, #f7b05c 0%, #6e4e8e 35%, #243665 100%)';
      } else if (progress < 0.5) { // Morning to noon
        containerRef.current.style.backgroundColor = '#1c7fee';
        containerRef.current.style.backgroundImage = 'linear-gradient(to top, #f8c254 0%, #90d0ff 35%, #1c7fee 100%)';
      } else if (progress < 0.75) { // Noon to evening
        containerRef.current.style.backgroundColor = '#5932be';
        containerRef.current.style.backgroundImage = 'linear-gradient(to top, #e65c00 0%, #8446bd 35%, #5932be 100%)';
      } else { // Evening to night
        containerRef.current.style.backgroundColor = '#0f1642';
        containerRef.current.style.backgroundImage = 'linear-gradient(to top, #381c59 0%, #192052 35%, #0f1642 100%)';
      }
    }
  };

  return (
    <div className={styles.skyContainer} ref={containerRef}>
      <div className={styles.sun} ref={sunRef}></div>
      <div className={styles.moon} ref={moonRef}></div>
      
      {/* Clouds */}
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
      
      {/* Container for stars */}
      <div className={styles.starsContainer} ref={starsContainerRef}></div>
    </div>
  );
};

export default CelestialBackground;
