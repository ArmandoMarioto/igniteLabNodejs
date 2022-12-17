import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}
  countManyByRecipientId(recipientId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
  async findById(notificationId: string): Promise<Notification | null> {
    throw new Error('Method not implemented.');
  }

  async save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.ToPrisma(notification);
    await this.prismaService.notification.create({
      data: raw,
    });
  }
}
