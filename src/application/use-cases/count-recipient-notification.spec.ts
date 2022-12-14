import { makeNotification } from '@test/factories/notification-factory';
import { InMemorynotificationsRepository } from '../../../test/repositories/notifications-repository-inMemory';
import { CountRecipientNotifications } from './count-recipient-notification';

describe('Count recipients notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemorynotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );
    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );
    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );
    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
