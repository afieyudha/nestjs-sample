import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

export class PostsCache {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  async set(key: string, value: any): Promise<void> {
    await this.cacheManager.set(key, value, 60 );
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}