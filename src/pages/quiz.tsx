import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import QuizContainer from '@/components/quiz/QuizContainer';

const QuizPage: NextPage = () => {
  return (
    <Layout title="Prahar Personality Quiz">
      <QuizContainer />
    </Layout>
  );
};

export default QuizPage;
