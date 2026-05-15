import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import {
  GitBranch,
  FileText,
  Zap,
  Globe,
  ArrowRight,
  Sun,
  Moon,
  Github,
} from 'lucide-react';

const features = [
  {
    key: 'git',
    icon: GitBranch,
  },
  {
    key: 'markdown',
    icon: FileText,
  },
  {
    key: 'deploy',
    icon: Zap,
  },
  {
    key: 'framework',
    icon: Globe,
  },
];

export function LoginPage() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('cms-theme', next ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 h-16 border-b border-[hsl(var(--border))]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <span className="text-lg font-bold text-[hsl(var(--foreground))] tracking-tight">AnyoneCMS</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDark}
            className="h-8 w-8 rounded-md flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] transition-colors"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={login}
            className="hidden sm:flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
          >
            {t('auth.login')}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-2xl text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] px-3.5 py-1 text-xs text-[hsl(var(--muted-foreground))]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t('landing.badge')}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--foreground))] tracking-tight leading-tight">
            {t('landing.title')}{' '}
            <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
              {t('landing.titleHighlight')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-lg mx-auto leading-relaxed">
            {t('landing.subtitle')}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={login}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-lg bg-[hsl(var(--foreground))] px-6 py-3 text-sm font-medium text-[hsl(var(--background))] hover:opacity-90 transition-opacity"
            >
              <Github className="h-5 w-5" />
              {t('auth.loginWithGitHub')}
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg border border-[hsl(var(--border))] px-6 py-3 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] transition-colors"
            >
              {t('landing.learnMore')}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-3xl w-full mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {features.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 text-center space-y-2"
            >
              <div className="mx-auto w-9 h-9 rounded-md bg-[hsl(var(--accent))] flex items-center justify-center">
                <Icon className="h-4.5 w-4.5 text-[hsl(var(--foreground))]" />
              </div>
              <h3 className="text-sm font-medium text-[hsl(var(--foreground))]">
                {t(`landing.feature.${key}.title`)}
              </h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
                {t(`landing.feature.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--border))] px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[hsl(var(--muted-foreground))]">
          <span>AnyoneCMS &middot; {t('landing.footer')}</span>
          <span>{t('landing.poweredBy')}</span>
        </div>
      </footer>
    </div>
  );
}
