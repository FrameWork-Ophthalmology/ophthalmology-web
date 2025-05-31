import { Injectable } from '@angular/core';
import * as crc from 'crc'; // Import the crc library directly

@Injectable({ providedIn: 'root' })
export class ChecksumService {
  calculateChecksum(data: string): string {
    try {
      const buffer = new TextEncoder().encode(data);
      const checksum = crc.crc32(buffer).toString(16).toUpperCase();
      return checksum;
    } catch (error) {
      console.error("Error calculating checksum:", error);
      return "Error";
    }
  }
}