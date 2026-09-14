import { CheckCircle2 } from 'lucide-react';
import { ExerciseBlock } from './ExerciseBlock';
import type { LessonExercise, SubmitCodeResponse } from '../../services/api';

interface ExercisesBlockProps {
  exercises: LessonExercise[];
  codes: Record<string, string>;
  onCodeChange: (exerciseId: string, code: string) => void;
  onSubmit: (exerciseId: string) => void;
  submitting: string | null;
  results: Record<string, SubmitCodeResponse>;
  attempts: number;
}

export function ExercisesBlock({
  exercises,
  codes,
  onCodeChange,
  onSubmit,
  submitting,
  results,
  attempts,
}: ExercisesBlockProps) {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-text-primary">
          Exercícios práticos
        </h2>
        <span className="text-xs text-text-muted bg-surface-elevated px-2.5 py-1 rounded-full border border-border">
          {exercises.length}{' '}
          {exercises.length === 1 ? 'exercício' : 'exercícios'}
        </span>
      </div>

      {exercises.map((exercise, index) => (
        <div key={exercise.id} className="relative">
          {results[exercise.id]?.success && (
            <div className="absolute -top-2 -right-2 z-10 w-8 h-8 rounded-full bg-accent-500 border-2 border-surface flex items-center justify-center shadow-lg">
              <CheckCircle2 size={16} className="text-surface" />
            </div>
          )}

          <ExerciseBlock
            exerciseNumber={index + 1}
            title={exercise.title}
            statement={exercise.statement}
            hint={exercise.hint}
            code={codes[exercise.id] ?? exercise.starter_code}
            onCodeChange={(code) => onCodeChange(exercise.id, code)}
            onSubmit={() => onSubmit(exercise.id)}
            submitting={submitting === exercise.id}
            result={results[exercise.id] ?? null}
            attempts={attempts}
          />
        </div>
      ))}
    </section>
  );
}