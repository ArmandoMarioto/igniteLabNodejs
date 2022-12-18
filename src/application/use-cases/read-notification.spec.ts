import { makeNotification } from '@test/factories/notification-factory';
import { InMemorynotificationsRepository } from '../../../test/repositories/notifications-repository-inMemory';
import { NotificationNotFound } from './erros/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemorynotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);
    const notification = makeNotification();
    notificationsRepository.create(notification);
    await readNotification.execute({
      notificationId: notification.id,
    });
    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
    expect(notification).toBeTruthy();
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
  it('should not be able to read a notification when it does not exist ', async () => {
    const notificationsRepository = new InMemorynotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(async () => {
      return await readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toBeInstanceOf(NotificationNotFound);
  });
});
