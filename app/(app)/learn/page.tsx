import { redirect } from 'next/navigation';

export default function LearnPage() {
  // Redirect to the first pattern in the curriculum
  // In a real app, this would query the memory engine for the user's current active pattern.
  redirect('/topic/prefix-sum');
}
