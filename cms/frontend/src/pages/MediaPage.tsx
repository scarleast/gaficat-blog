import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '@/lib/api';
import type { MediaFile } from '@/types';

export function MediaPage() {
  const { siteId } = useParams<{ siteId: string }>();
  const { t } = useTranslation();
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!siteId) return;
    api.listMedia(Number(siteId))
      .then((res) => setFiles(res.files || []))
      .catch(() => setFiles([]))
      .finally(() => setLoading(false));
  }, [siteId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !siteId) return;
    setUploading(true);
    try {
      const reader = new FileReader();
      const content = await new Promise<string>((resolve) => {
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1]); // strip data:*/*;base64, prefix
        };
        reader.readAsDataURL(file);
      });
      await api.uploadMedia(Number(siteId), file.name, content);
      const res = await api.listMedia(Number(siteId));
      setFiles(res.files || []);
    } catch { /* ignore */ }
    finally { setUploading(false); }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (path: string, sha: string) => {
    if (!confirm(t('media.deleteConfirm')) || !siteId) return;
    await api.deleteMedia(Number(siteId), path, sha);
    setFiles(files.filter((f) => f.path !== path));
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">{t('media.title')}</h1>
        <label className="cursor-pointer rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:opacity-90">
          {uploading ? t('media.uploading') : t('media.upload')}
          <input ref={fileInputRef} type="file" accept="image/*,video/*,audio/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[hsl(var(--muted-foreground))]">{t('common.loading')}</div>
      ) : files.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[hsl(var(--border))] p-12 text-center">
          <p className="text-[hsl(var(--muted-foreground))]">{t('media.noMedia')}</p>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{t('media.dragDrop')}</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {files.map((file) => (
            <div key={file.path} className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden">
              {file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) && file.download_url && (
                <img src={file.download_url} alt={file.name} className="w-full h-32 object-cover" />
              )}
              {!file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) && (
                <div className="w-full h-32 flex items-center justify-center bg-[hsl(var(--muted))]">
                  <span className="text-2xl">📄</span>
                </div>
              )}
              <div className="p-2">
                <p className="text-xs truncate text-[hsl(var(--foreground))]">{file.name}</p>
                <div className="mt-1 flex gap-2">
                  <button onClick={() => copyUrl(file.download_url || '')} className="text-xs text-[hsl(var(--primary))] hover:underline">{t('media.copyUrl')}</button>
                  <button onClick={() => handleDelete(file.path, file.sha)} className="text-xs text-red-500 hover:underline">{t('media.delete')}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
