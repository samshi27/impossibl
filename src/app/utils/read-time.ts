export function readTime(body: string): string {
  const trimmed = body.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const mins = Math.max(1, Math.ceil(words / 200));

  return `${mins} min read`;
}
