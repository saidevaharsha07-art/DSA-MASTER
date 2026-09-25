import type { Metadata } from 'next';
import { LandingPage } from '@frontend/components/landing/LandingPage';

export const metadata: Metadata = {
  title: 'DSA Magna — Master DSA. Build the Mindset.',
  description: 'Learn patterns, solve problems, track your progress, and turn consistent practice into real problem-solving ability with structured roadmaps, intelligent analytics, spaced repetition, and an AI mentor.',
  keywords: ['DSA', 'Data Structures', 'Algorithms', 'LeetCode', 'CodeChef', 'Codeforces', 'Coding Interview', 'Software Engineering'],
  openGraph: {
    title: 'DSA Magna — Master DSA. Build the Mindset.',
    description: 'Learn patterns, solve problems, track your progress, and turn consistent practice into real problem-solving ability.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSA Magna — Master DSA. Build the Mindset.',
    description: 'Learn patterns, solve problems, track your progress, and turn consistent practice into real problem-solving ability.',
  },
};

export default function Home() {
  return <LandingPage />;
}
