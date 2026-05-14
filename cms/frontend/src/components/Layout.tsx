import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: t('nav.dashboard') },
    { path: '/sites', label: t('nav.sites') },
    { path: '/settings', label: t('nav.settings') },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-lg font-semibold text-[hsl(var(--foreground))]">
              {t('app.title')}
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive(item.path)
                      ? 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]'
                      : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="h-8 rounded-md border border-[hsl(var(--input))] bg-transparent px-2 text-sm"
            >
              <option value="zh-CN">中文</option>
              <option value="en">English</option>
            </select>

            {/* User menu */}
            <div className="hidden md:flex items-center gap-2">
              {user?.avatar_url && (
                <img src={user.avatar_url} alt="" className="h-7 w-7 rounded-full" />
              )}
              <span className="text-sm text-[hsl(var(--muted-foreground))]">{user?.username}</span>
              <button
                onClick={logout}
                className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              >
                {t('nav.logout')}
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-[hsl(var(--accent))]"
              aria-label="Menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 pb-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm ${
                  isActive(item.path)
                    ? 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]'
                    : 'text-[hsl(var(--muted-foreground))]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-[hsl(var(--border))]">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">{user?.username}</span>
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="ml-3 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              >
                {t('nav.logout')}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        {children}
      </main>
    </div>
  );
}
