import type { User, Site, Post, MediaFile, Build } from '@/types';

const API_BASE = '/api';

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('cms-token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('cms-token', token);
    } else {
      localStorage.removeItem('cms-token');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    });

    if (res.status === 401) {
      this.setToken(null);
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(body.error || res.statusText);
    }

    return res.json();
  }

  // Auth
  getGithubAuthUrl() {
    return `${API_BASE}/auth/github`;
  }
  async getMe() {
    return this.request<{ user: User }>('/auth/me');
  }
  async logout() {
    this.setToken(null);
  }

  // Sites
  async listSites() {
    return this.request<{ sites: Site[] }>('/sites');
  }
  async getSite(id: number) {
    return this.request<{ site: Site }>(`/sites/${id}`);
  }
  async createSite(data: Partial<Site>) {
    return this.request<{ site: Site }>('/sites', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  async updateSite(id: number, data: Partial<Site>) {
    return this.request<{ site: Site }>(`/sites/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
  async deleteSite(id: number) {
    return this.request(`/sites/${id}`, { method: 'DELETE' });
  }

  // Posts
  async listPosts(siteId: number) {
    return this.request<{ posts: Post[] }>(`/sites/${siteId}/posts`);
  }
  async getPost(siteId: number, path: string) {
    const encoded = encodeURIComponent(path);
    return this.request<{ post: Post }>(`/sites/${siteId}/posts/${encoded}`);
  }
  async savePost(siteId: number, path: string, content: string, sha?: string) {
    const encoded = encodeURIComponent(path);
    return this.request<{ post: Post }>(`/sites/${siteId}/posts/${encoded}`, {
      method: 'PUT',
      body: JSON.stringify({ content, sha }),
    });
  }
  async deletePost(siteId: number, path: string, sha: string) {
    const encoded = encodeURIComponent(path);
    return this.request(`/sites/${siteId}/posts/${encoded}`, {
      method: 'DELETE',
      body: JSON.stringify({ sha }),
    });
  }

  // Media
  async listMedia(siteId: number) {
    return this.request<{ files: MediaFile[] }>(`/sites/${siteId}/media`);
  }
  async uploadMedia(siteId: number, filename: string, content: string) {
    return this.request<{ file: { name: string; path: string; sha: string } }>(`/sites/${siteId}/media/upload`, {
      method: 'POST',
      body: JSON.stringify({ filename, content }),
    });
  }
  async deleteMedia(siteId: number, path: string, sha: string) {
    const encoded = encodeURIComponent(path);
    return this.request(`/sites/${siteId}/media/${encoded}`, {
      method: 'DELETE',
      body: JSON.stringify({ sha }),
    });
  }

  // Builds
  async triggerBuild(siteId: number) {
    return this.request<{ build: Build }>(`/sites/${siteId}/builds/trigger`, {
      method: 'POST',
    });
  }
  async listBuilds(siteId: number) {
    return this.request<{ builds: Build[] }>(`/sites/${siteId}/builds`);
  }
}

export const api = new ApiClient();
