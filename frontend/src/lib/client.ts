// src/lib/api/client.ts
import { createClient, createConfig } from '@hey-api/client-fetch';
import type { ClientOptions } from './api/types.gen';

export const apiClient = createClient(
  createConfig<ClientOptions>({
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000',
    headers: {

    },
  })
);
