import { makeNotification } from '@test/factories/notification-factory';
import { InMemorynotificationsRepository } from '../../../test/repositories/notifications-repository-inMemory';
import { NotificationNotFound } from './erros/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('should be able to Unread a notification', async () => {
    const notificationsRepository = new InMemorynotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);
    const notification = makeNotification({
      readAt: new Date(),
    });
    notificationsRepository.create(notification);
    await unreadNotification.execute({
      notificationId: notification.id,
    });
    expect(notificationsRepository.notifications[0].readAt).toBeNull();
    expect(notification).toBeTruthy();
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
  it('should not be able to unread a notification when it does not exist ', async () => {
    const notificationsRepository = new InMemorynotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(async () => {
      return await unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toBeInstanceOf(NotificationNotFound);
  });
});
