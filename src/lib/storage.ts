/**
 * Extracts the file path inside a Supabase Storage bucket from its public URL.
 * e.g. "https://xxx.supabase.co/storage/v1/object/public/updates/hero/123-photo.jpg"
 *      → "hero/123-photo.jpg"
 */
export function extractStoragePath(publicUrl: string, bucket: string): string | null {
  if (!publicUrl) return null;
  const marker = `/object/public/${bucket}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return null;
  return decodeURIComponent(publicUrl.substring(idx + marker.length));
}
