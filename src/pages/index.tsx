import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import CelestialBackground from '@/components/quiz/CelestialBackground';
import styles from '@/styles/Home.module.css';

const Home: NextPage = () => {
  const router = useRouter();

  const handleStartQuiz = () => {
    router.push('/quiz');
  };

  return (
    <Layout title="Welcome to Prahar Personality Quiz">
      <CelestialBackground progress={0.1} />
      
      <div className={styles.homeContainer}>
        <h1 className={styles.title}>Prahar Personality Quiz</h1>
        
        <p className={styles.description}>
          Discover your Prahar personality type with this immersive quiz that transitions through
          the day/night cycle as you progress. Answer 10 questions to reveal your Prahar.
        </p>
        
        <div className={styles.praharInfo}>
          <h2>What is a Prahar?</h2>
          <p>
            In traditional Indian timekeeping, a day is divided into eight prahars, each representing 
            a different phase of the day and night cycle. Each prahar has unique qualities and energies
            that can correspond to different personality types.
          </p>
        </div>
        
        <button 
          className={styles.startButton}
          onClick={handleStartQuiz}
        >
          Start Quiz
        </button>
      </div>
    </Layout>
  );
};

export default Home;
