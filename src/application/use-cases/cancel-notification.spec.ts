import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemorynotificationsRepository } from '../../../test/repositories/notifications-repository-inMemory';
import { CancelNotification } from './cancel-notification';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemorynotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);
    const notification = new Notification({
      recipientId: 'exemple-recipient-id',
      category: 'social',
      content: new Content('This is a notification'),
    });
    notificationsRepository.create(notification);
    await cancelNotification.execute({
      notificationId: notification.id,
    });
    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
    expect(notification).toBeTruthy();
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
  /*it('should not be able to cancel a notification when it does not exist ', async () => {
    const notificationsRepository = new InMemorynotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(async () => {
      return await cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toBeInstanceOf(NotificationNotFound);
  });*/
});
