import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '@/lib/api';
import type { Site } from '@/types';

export function DashboardPage() {
  const { t } = useTranslation();
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listSites()
      .then((res) => setSites(res.sites || []))
      .catch(() => setSites([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-[hsl(var(--muted-foreground))]">{t('common.loading')}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">{t('dashboard.title')}</h1>
        <Link
          to="/sites"
          className="rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:opacity-90"
        >
          {t('dashboard.createSite')}
        </Link>
      </div>

      {sites.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[hsl(var(--border))] p-12 text-center">
          <p className="text-[hsl(var(--muted-foreground))]">{t('dashboard.noSites')}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <Link
              key={site.id}
              to={`/sites/${site.id}/posts`}
              className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-[hsl(var(--foreground))]">{site.name}</h3>
              <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{site.repo_full_name}</p>
              <div className="mt-3 flex gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                <span className="rounded bg-[hsl(var(--secondary))] px-2 py-0.5">{site.framework}</span>
                <span className="rounded bg-[hsl(var(--secondary))] px-2 py-0.5">{site.branch}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
