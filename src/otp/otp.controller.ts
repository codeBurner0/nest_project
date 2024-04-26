// otp.controller.ts
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { OTPService } from './otp.service';

@Controller('otp')
export class OTPController {
  constructor(private readonly otpService: OTPService) {}

  @Post('generate')
  async generateOTP(@Body('phoneNumber') phoneNumber: string) {
    const otp = await this.otpService.generateOTP(phoneNumber);
    // OTP sent via SMS
    return { message: 'OTP generated successfully' };
  }

  @Post('verify')
  async verifyOTP(@Body('phoneNumber') phoneNumber: string, @Body('otp') otp: string) {
    const isVerified = await this.otpService.verifyOTP(phoneNumber, otp);
    if (isVerified) {
      return { message: 'OTP verified successfully' };
    } else {
      throw new BadRequestException('Invalid OTP');
    }
  }
}
