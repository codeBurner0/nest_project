// otp.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OTP } from './otp.entity';
import * as crypto from 'crypto';
import { Twilio } from 'twilio';

@Injectable()
export class OTPService {
  private twilioClient: Twilio;

  constructor(
    @InjectRepository(OTP)
    private readonly otpRepository: Repository<OTP>,
  ) {
    this.twilioClient = new Twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');
  }

  async generateOTP(phoneNumber: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    const newOTP = new OTP();
    newOTP.phoneNumber = phoneNumber;
    newOTP.otp = otp;
    await this.otpRepository.save(newOTP);

    // Send OTP via SMS
    try {
      await this.twilioClient.messages.create({
        body: `Your OTP is: ${otp}`,
        to: phoneNumber,
        from: 'TWILIO_PHONE_NUMBER'
      });
    } catch (error) {
      console.error('Error sending OTP via Twilio:', error);
      throw new Error('Error sending OTP via SMS');
    }

    return otp;
  }

  async verifyOTP(phoneNumber: string, otp: string): Promise<boolean> {
    const otpRecord = await this.otpRepository.findOne({
      where: { phoneNumber, otp }
    });
    return !!otpRecord; // Returns true if record found, false otherwise
  }
}
