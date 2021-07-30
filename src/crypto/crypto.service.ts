import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  private algorithm: string;
  private secretKey: string;
  private initVector: Buffer;

  constructor(private configService: ConfigService) {
    this.algorithm = 'aes-256-cbc';
    this.initVector = crypto.randomBytes(16);
    const encryptionSecret = this.configService.get('security.encryptionSecret');
    this.secretKey = crypto.createHash('sha256').update(String(encryptionSecret)).digest('base64').substr(0, 32);
  }

  encryptString(text: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.initVector);
    let encryptedText = cipher.update(text, 'utf-8', 'hex');
    encryptedText += cipher.final('hex');

    return encryptedText;
  }

  decryptString(text: string): string {
    console.log('1');
    const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, this.initVector);
    console.log('2');
    decipher.setAutoPadding(false);
    let decryptedText: string = decipher.update(text, 'hex', 'utf-8');
    console.log('3');
    decryptedText += decipher.final('utf8');

    console.log('4');
    console.log(
      '🚀 ~ file: crypto.service.ts ~ line 35 ~ CryptoService ~ decryptString ~ decryptedText',
      decryptedText
    );

    return decryptedText;
  }
}
