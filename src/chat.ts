import { Client } from 'twilio-chat';
import { Channel } from 'twilio-chat/lib/channel';

/**
 * Will try to retrieve a channel. If the channel, it will create the channel if
 * it fails to retrieve it.
 * @param client A Twilio Chat client instance
 * @param uniqueName The unique name of your channel. Will be used for creation
 * @param options Any options you would want to pass to the channel creation
 */
export async function getOrCreateChannelByUniqueName(
  client: Client,
  uniqueName: string,
  options: any = {}
): Promise<Channel> {
  try {
    return await client.getChannelByUniqueName(uniqueName);
  } catch (err) {
    options.uniqueName = uniqueName;
    return client.createChannel(options);
  }
}
