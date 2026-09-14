/**
 * Mapeia IDs reais (ex: "01-03") para números visuais sequenciais (ex: 2).
 * Isso permite pular IDs no backend sem quebrar a sequência visual.
 */

// Ordem oficial das lições do módulo 01 (IDs reais do backend)
const MODULE_01_LESSONS = [
  '01-01',
  '01-03',
  '01-04',
  '01-05',
  '01-06',
  '01-07',
  '01-08',
  '01-09',
  '01-10',
  '01-11',
  '01-12',
];

/**
 * Retorna o número visual (1, 2, 3, ...) para um ID de lição.
 * Ex: "01-01" → 1, "01-03" → 2, "01-04" → 3
 */
export function getDisplayNumber(lessonId: string): number {
  const index = MODULE_01_LESSONS.indexOf(lessonId);
  return index >= 0 ? index + 1 : 0;
}

/**
 * Retorna o número visual formatado com 2 dígitos.
 * Ex: "01-01" → "01", "01-03" → "02"
 */
export function getDisplayNumberPadded(lessonId: string): string {
  const num = getDisplayNumber(lessonId);
  return String(num).padStart(2, '0');
}