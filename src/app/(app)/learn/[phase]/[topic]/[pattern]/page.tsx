import { notFound } from 'next/navigation';
import { getPattern } from '@/src/content';
import { PatternHeader } from '@/src/components/pattern/PatternHeader';
import { PatternOverview } from '@/src/components/pattern/PatternOverview';
import { LearningObjectives } from '@/src/components/pattern/LearningObjectives';
import { RecognitionSignals } from '@/src/components/pattern/RecognitionSignals';
import { WhenToUse, WhenNotToUse } from '@/src/components/pattern/WhenToUse';
import { ComplexityCard } from '@/src/components/pattern/ComplexityCard';
import { VisualExplanation } from '@/src/components/pattern/VisualExplanation';
import { CodeTemplates } from '@/src/components/pattern/CodeTemplates';
import { CommonMistakes } from '@/src/components/pattern/CommonMistakes';
import { InterviewTips } from '@/src/components/pattern/InterviewTips';
import { ProblemRoadmap } from '@/src/components/pattern/ProblemRoadmap';
import { RelatedPatterns } from '@/src/components/pattern/RelatedPatterns';
import { NotesPreview } from '@/src/components/pattern/NotesPreview';
import { RevisionPreview } from '@/src/components/pattern/RevisionPreview';
import { TableOfContents } from '@/src/components/pattern/TableOfContents';
import { VisualizationRenderer } from '@/src/components/visualization/VisualizationRenderer';

interface PageProps {
  params: Promise<{
    phase: string;
    topic: string;
    pattern: string;
  }>;
}

export default async function PatternPage({ params }: PageProps) {
  const resolvedParams = await params;
  
  let pattern;
  try {
    pattern = await getPattern(resolvedParams.pattern);
  } catch (error) {
    notFound();
  }

  // Double check the route matches the pattern data to prevent incorrect URLs
  if (
    resolvedParams.topic !== pattern.topic ||
    resolvedParams.phase !== `phase-${pattern.phase.toString().padStart(2, '0')}`
  ) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* Main Content Area (70%) */}
          <div className="flex-1 lg:max-w-[70%]">
            <div className="flex flex-col gap-16">
              
              <PatternHeader pattern={pattern} />
              
              <PatternOverview 
                overview={pattern.overview} 
                intuition={pattern.intuition} 
              />
              
              <LearningObjectives objectives={pattern.learningObjectives} />
              
              <RecognitionSignals signals={pattern.recognitionSignals} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <WhenToUse items={pattern.whenToUse} />
                <WhenNotToUse items={pattern.whenNotToUse} />
              </div>
              
              <ComplexityCard complexity={pattern.complexity} />
              
              <VisualExplanation steps={pattern.visualExplanation} />
              
              {pattern.interactiveVisualization && (
                <VisualizationRenderer model={pattern.interactiveVisualization} />
              )}
              
              <CodeTemplates templates={pattern.templates} />
              
              <CommonMistakes mistakes={pattern.commonMistakes} />
              
              <InterviewTips tips={pattern.interviewTips} />
              
              <ProblemRoadmap problems={pattern.problems} />
              
              <div className="pt-8 border-t border-white/5">
                <NotesPreview notes={pattern.notes} />
                <RevisionPreview revisionPlan={pattern.revisionPlan} />
                <RelatedPatterns patterns={pattern.relatedPatterns} />
              </div>

            </div>
          </div>

          {/* Sidebar Area (30%) */}
          <div className="hidden lg:block w-72 shrink-0">
            <TableOfContents />
          </div>

        </div>
      </div>
    </div>
  );
}
