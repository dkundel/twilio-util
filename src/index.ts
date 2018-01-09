import * as chatImports from './chat';

/**
 * Drops any internal properties to avoid a circular structure to make it
 * useable with JSON.stringify and similar.
 * @param instance An API response from the Twilio API
 */
export function toJson(instance: any | any[]): any | any[] {
  // TODO: Instance and return type should be typed properly once Node.js types are out
  type typeOfInstance = typeof instance;
  function instanceToJson(el: typeOfInstance) {
    const objectKeys = Object.getOwnPropertyNames(el).filter(
      name => name[0] !== '_'
    );

    let json: any = {};
    for (let prop of objectKeys) {
      const val = el[prop];
      if (typeof val !== 'object') {
        json[prop] = val;
      }
    }
    return json;
  }

  if (Array.isArray(instance)) {
    return instance.map(instanceToJson);
  }

  return instanceToJson(instance);
}

/**
 * Will try to get a resource by its unique name and create it if it doesn't exist
 * @param resource The resource context for which a new resource should be created
 * @param name Unique name of the resource that should be used for creation
 * @param options Additional options that should be passed to the creation
 */
export async function getOrCreateResource(
  resource: any,
  name: string,
  options: any = {}
): Promise<any> {
  // TODO: Type the resource once the typings are available
  try {
    return await resource(name).fetch();
  } catch (err) {
    options.uniqueName = name;
    return resource.create(options);
  }
}

/**
 * Resets a SyncMap by deleting and recreating it. This will change the SID though.
 * @param syncServiceContext A Sync Service Context from the REST Api
 * @param name Name of the SyncMap that should be reset
 */
export async function resetSyncMap(
  syncServiceContext: any,
  name: string
): Promise<any> {
  await syncServiceContext.syncMaps(name).remove();
  return getOrCreateResource(syncServiceContext.syncMaps, name);
}

export const chatSdk = chatImports;
