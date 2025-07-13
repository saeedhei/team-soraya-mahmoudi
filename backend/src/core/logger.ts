// src/core/logger.ts
import winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

// فرمت سفارشی برای لاگ‌ها
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

export const logger = winston.createLogger({
  level: 'info', // سطح پیش‌فرض لاگ
  format: combine(
    timestamp(), // اضافه کردن زمان
    customFormat, // فرمت سفارشی
  ),
  transports: [
    // نمایش رنگی لاگ‌ها در کنسول
    new winston.transports.Console({
      format: combine(colorize(), customFormat),
    }),

    // ذخیره لاگ‌های خطا در فایل
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 20 * 1024 * 1024, // 20 مگابایت (به بایت محاسبه شود)
      maxFiles: 14, // تعداد روز (به عدد)
    }),

    // ذخیره تمام لاگ‌ها
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});
