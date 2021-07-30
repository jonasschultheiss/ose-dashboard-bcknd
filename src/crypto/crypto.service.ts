import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  private algorithm: string;
  private secretKey: Buffer;

  constructor(private configService: ConfigService) {
    this.algorithm = 'aes-256-cbc';
    const encryptionSecret: string = this.configService.get('security.encryptionSecret');
    this.secretKey = Buffer.from(encryptionSecret.substring(0, 32));
  }

  encryptString(text: string): string {
    const initVector = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, initVector);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return `${initVector.toString('hex')}:${encrypted.toString('hex')}`;
  }

  decryptString(text: string): string {
    const parts = text.split(':');
    const initVector = Buffer.from(parts.shift(), 'hex');
    const encrypted = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, initVector);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }
}
