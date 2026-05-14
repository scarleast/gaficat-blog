import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '@/lib/api';
import type { Site } from '@/types';

export function SiteSettingsPage() {
  const { siteId } = useParams<{ siteId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [site, setSite] = useState<Site | null>(null);
  const [form, setForm] = useState<Partial<Site>>({});

  useEffect(() => {
    if (!siteId) return;
    api.getSite(Number(siteId))
      .then((res) => { setSite(res.site); setForm(res.site); })
      .catch(() => navigate('/'));
  }, [siteId]);

  if (!site) return <div className="text-center py-12 text-[hsl(var(--muted-foreground))]">{t('common.loading')}</div>;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.updateSite(site!.id, form);
    navigate('/');
  };

  const fields: { key: keyof Site; label: string; type?: string }[] = [
    { key: 'name', label: t('sites.name') },
    { key: 'repo_full_name', label: t('sites.repo') },
    { key: 'branch', label: t('sites.branch') },
    { key: 'content_dir', label: t('sites.contentDir') },
    { key: 'media_dir', label: t('sites.mediaDir') },
    { key: 'framework', label: t('sites.framework') },
    { key: 'build_command', label: t('sites.buildCommand') },
    { key: 'output_dir', label: t('sites.outputDir') },
  ];

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">{t('sites.settings')}</h1>
      <form onSubmit={handleSave} className="space-y-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
        {fields.map(({ key, label, type }) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              value={(form[key] as string) ?? ''}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              type={type}
              className="w-full rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-2 text-sm"
            />
          </div>
        ))}
        <div className="flex gap-3 pt-2">
          <button type="submit" className="rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:opacity-90">
            {t('sites.save')}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="rounded-md border border-[hsl(var(--input))] px-4 py-2 text-sm hover:bg-[hsl(var(--accent))]">
            {t('sites.cancel')}
          </button>
        </div>
      </form>
    </div>
  );
}
