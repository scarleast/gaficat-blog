import { useTranslation } from 'react-i18next';

export function SettingsPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">{t('settings.title')}</h1>

      <div className="space-y-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
        {/* Language */}
        <div>
          <label className="block text-sm font-medium mb-2">{t('settings.language')}</label>
          <div className="flex gap-3">
            <button
              onClick={() => i18n.changeLanguage('zh-CN')}
              className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                i18n.language === 'zh-CN'
                  ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                  : 'border-[hsl(var(--input))] hover:bg-[hsl(var(--accent))]'
              }`}
            >
              {t('settings.languageZh')}
            </button>
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                i18n.language === 'en'
                  ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                  : 'border-[hsl(var(--input))] hover:bg-[hsl(var(--accent))]'
              }`}
            >
              {t('settings.languageEn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
