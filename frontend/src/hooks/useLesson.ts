import { useCallback, useEffect, useRef, useState } from 'react';
import {
  lessonApi,
  type LessonDetailResponse,
  type SubmitCodeResponse,
} from '../services/api';

function codeStorageKey(lessonId: string) {
  return `devstack:codigo:${lessonId}`;
}

function loadCodes(
  lessonId: string,
  topics: { exercise: { id: string; starter_code: string } | null }[]
): Record<string, string> {
  const raw = localStorage.getItem(codeStorageKey(lessonId));
  const saved = raw ? JSON.parse(raw) : {};
  const codes: Record<string, string> = {};
  for (const topic of topics) {
    if (topic.exercise) {
      codes[topic.exercise.id] =
        saved[topic.exercise.id] ?? topic.exercise.starter_code;
    }
  }
  return codes;
}

export function useLesson(lessonId: string | undefined) {
  const [data, setData] = useState<LessonDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [codes, setCodes] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, SubmitCodeResponse>>({});

  const startedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!lessonId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);
    setResults({});
    startedAtRef.current = Date.now();

    lessonApi
      .getLesson(lessonId)
      .then((response) => {
        if (cancelled) return;
        if (!response || !response.lesson) {
          setError('Resposta inválida do servidor.');
          return;
        }
        setData(response);
        const topics = response.lesson.topics ?? [];
        setCodes(loadCodes(lessonId, topics));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message ?? 'Erro ao carregar a lição');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  const updateCode = useCallback(
    (exerciseId: string, value: string) => {
      setCodes((prev) => {
        const next = { ...prev, [exerciseId]: value };
        if (lessonId) {
          localStorage.setItem(codeStorageKey(lessonId), JSON.stringify(next));
        }
        return next;
      });
    },
    [lessonId]
  );

  const submit = useCallback(
    async (exerciseId: string) => {
      if (!lessonId) return;
      const code = codes[exerciseId];
      if (!code) return;

      setSubmitting(exerciseId);
      setResults((prev) => {
        const next = { ...prev };
        delete next[exerciseId];
        return next;
      });

      try {
        const timeSpentSeconds = Math.round(
          (Date.now() - startedAtRef.current) / 1000
        );
        const response = await lessonApi.submitCode(
          lessonId,
          code,
          exerciseId,
          timeSpentSeconds
        );
        setResults((prev) => ({ ...prev, [exerciseId]: response }));

        if (response.success) {
          setCodes((prev) => {
            const next = { ...prev };
            delete next[exerciseId];
            if (lessonId) {
              localStorage.setItem(
                codeStorageKey(lessonId),
                JSON.stringify(next)
              );
            }
            return next;
          });
        }
      } catch (err) {
        setResults((prev) => ({
          ...prev,
          [exerciseId]: {
            success: false,
            error_type: 'RuntimeError',
            error_message:
              err instanceof Error ? err.message : 'Erro inesperado',
            hint: 'Tente novamente em alguns instantes.',
          },
        }));
      } finally {
        setSubmitting(null);
      }
    },
    [lessonId, codes]
  );

  return { data, loading, error, codes, updateCode, submit, submitting, results };
}