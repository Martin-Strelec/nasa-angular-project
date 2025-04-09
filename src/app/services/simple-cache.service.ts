import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SimpleCacheService {
  items: any[] = [];
  sanitizedURLs: { [key: string]: SafeResourceUrl } = {};
}
