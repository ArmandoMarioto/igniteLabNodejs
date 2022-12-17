import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemorynotificationsRepository } from '../../../test/repositories/notifications-repository-inMemory';
import { CountRecipientNotifications } from './count-recipient-notification';

describe('Count recipients notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemorynotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );
    await notificationsRepository.create(
      new Notification({
        recipientId: 'recipient-1',
        category: 'social',
        content: new Content('This is a notification'),
      }),
    );
    await notificationsRepository.create(
      new Notification({
        recipientId: 'recipient-1',
        category: 'social',
        content: new Content('This is a notification'),
      }),
    );
    await notificationsRepository.create(
      new Notification({
        recipientId: 'recipient-2',
        category: 'social',
        content: new Content('This is a notification'),
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
