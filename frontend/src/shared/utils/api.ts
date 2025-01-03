import { authService } from './auth';
import { config } from '../../config/config';

interface ApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.apiUrl;
  }

  private async getHeaders(): Promise<Headers> {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const token = await authService.getToken();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  private async request(endpoint: string, options: ApiOptions = {}) {
    const headers = await this.getHeaders();
    
    // Future log: API request started
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: options.method || 'GET',
        headers: {
          ...Object.fromEntries(headers),
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      if (!response.ok) {
        // Future log: API request failed
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Future log: API request successful
      return data;
    } catch (error) {
      // Future log: API request error
      throw error;
    }
  }

  // Files API
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const headers = await this.getHeaders();
    headers.delete('Content-Type'); // Let the browser set it

    return this.request('/api/files/upload', {
      method: 'POST',
      body: formData,
      headers: Object.fromEntries(headers),
    });
  }

  async listFiles() {
    return this.request('/api/files/list');
  }

  // Parsing API
  async parseFile(filePath: string) {
    return this.request('/api/parse/parse', {
      method: 'POST',
      body: { file_path: filePath },
    });
  }

  async getParseResult(fileId: string) {
    return this.request(`/api/parse/result/${fileId}`);
  }

  // Comparison API
  async compareFiles(sourceIds: string[]) {
    return this.request('/api/compare/compare', {
      method: 'POST',
      body: { source_ids: sourceIds },
    });
  }

  async listComparisons() {
    return this.request('/api/compare/list');
  }

  async getComparison(comparisonId: string) {
    return this.request(`/api/compare/${comparisonId}`);
  }

  // User Management API
  async getUserProfile() {
    return this.request('/api/users/profile');
  }

  async listUsers() {
    return this.request('/api/users/users');
  }

  async updateUserRole(userId: string, role: string) {
    return this.request('/api/users/role', {
      method: 'PUT',
      body: { user_id: userId, role },
    });
  }
}

export const api = new ApiService(); 