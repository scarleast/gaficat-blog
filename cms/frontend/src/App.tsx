import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { Layout } from '@/components/Layout';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { SitesPage } from '@/pages/SitesPage';
import { SiteSettingsPage } from '@/pages/SiteSettingsPage';
import { PostsPage } from '@/pages/PostsPage';
import { PostEditPage } from '@/pages/PostEditPage';
import { MediaPage } from '@/pages/MediaPage';
import { BuildsPage } from '@/pages/BuildsPage';
import { SettingsPage } from '@/pages/SettingsPage';

function ProtectedRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/sites" element={<SitesPage />} />
        <Route path="/sites/:siteId/settings" element={<SiteSettingsPage />} />
        <Route path="/sites/:siteId/posts" element={<PostsPage />} />
        <Route path="/sites/:siteId/posts/edit" element={<PostEditPage />} />
        <Route path="/sites/:siteId/media" element={<MediaPage />} />
        <Route path="/sites/:siteId/builds" element={<BuildsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </AuthProvider>
  );
}
