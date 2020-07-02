/* tslint:disable */
/* eslint-disable */
import itly, {
  Options as BaseOptions,
  Event as BaseEvent,
  Properties as BaseProperties,
  Plugin as BasePlugin,
  PluginBase as BasePluginBase,
  ValidationOptions as BaseValidationOptions,
  ValidationResponse as BaseValidationResponse,
} from '@itly/sdk';
import SchemaValidatorPlugin from '@itly/plugin-schema-validator';
import IterativelyPlugin, { IterativelyOptions as BaseIterativelyOptions } from '@itly/plugin-iteratively';
import AmplitudePlugin, { AmplitudeOptions } from '@itly/plugin-amplitude';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Event = BaseEvent;
export type Properties = BaseProperties;
export interface Plugin extends BasePlugin {};
export class PluginBase extends BasePluginBase {};
export type ValidationOptions = BaseValidationOptions;
export type ValidationResponse = BaseValidationResponse;
export type IterativelyOptions = WithOptional<BaseIterativelyOptions, 'url' | 'environment'>;

export interface IdentifyProperties {
  /**
   * The first name of the user.
   */
  first_name: string;
}
export interface TodoDeletedProperties {}
export interface TodosClearedProperties {}
export interface TodoCreatedProperties {}
export interface TodoToggledProperties {}
export interface TodosToggledProperties {}

export interface Options extends BaseOptions {
  /**
   * Analytics provider-specific configuration. Default is null.
   */
  destinations?: {
    iteratively?: IterativelyOptions,
    amplitude?: AmplitudeOptions
  };
}



class Itly {
  load(options: Options) {
    const {
      destinations = {},
      plugins = [],
      ...baseOptions
    } = options;

    itly.load({ ...baseOptions, plugins: [
      new IterativelyPlugin(options.environment === 'production'
        ? 'VwZgWTU0u2D9uimAkwIxya0dOXAFW1dE'
        : 'taQpDYJgWpeIVOclkolEm0EHBs4zo1LJ',
      {
        url: 'https://api.iterative.ly/t/version/94c87aa5-80fa-4008-b931-e5b2623985f5',
        environment: options.environment || 'development',
        ...destinations.iteratively,
      }),
      new SchemaValidatorPlugin({
        'identify': {"$id":"https://iterative.ly/company/44a66378-180b-4593-8031-e5c4538d9380/identify","$schema":"http://json-schema.org/draft-07/schema#","title":"Identify","description":"","type":"object","properties":{"first_name":{"description":"The first name of the user.","type":"string"}},"additionalProperties":false,"required":["first_name"]},
        'Todo Created': {"$id":"https://iterative.ly/company/44a66378-180b-4593-8031-e5c4538d9380/event/5a12a386-91a9-47e4-91fc-52d93bbfcd78/version/3.0.0","$schema":"http://json-schema.org/draft-07/schema#","title":"Todo Created","description":"Called when a todo is created.","type":"object","properties":{},"additionalProperties":false,"required":[]},
        'Todo Deleted': {"$id":"https://iterative.ly/company/44a66378-180b-4593-8031-e5c4538d9380/event/047da53e-da2f-4aed-8e4c-81ce3a61a42a/version/3.0.0","$schema":"http://json-schema.org/draft-07/schema#","title":"Todo Deleted","description":"Called when a todo is deleted.","type":"object","properties":{},"additionalProperties":false,"required":[]},
        'Todo Toggled': {"$id":"https://iterative.ly/company/44a66378-180b-4593-8031-e5c4538d9380/event/9df75462-3736-4a9e-9e00-46b504555be2/version/1.0.0","$schema":"http://json-schema.org/draft-07/schema#","title":"Todo Toggled","description":"Called when a todo is toggled.","type":"object","properties":{},"additionalProperties":false,"required":[]},
        'Todos Cleared': {"$id":"https://iterative.ly/company/44a66378-180b-4593-8031-e5c4538d9380/event/2a656e32-0e2b-4a0c-8132-9750768101be/version/3.0.1","$schema":"http://json-schema.org/draft-07/schema#","title":"Todos Cleared","description":"Called when todos are cleared.","type":"object","properties":{},"additionalProperties":false,"required":[]},
        'Todos Toggled': {"$id":"https://iterative.ly/company/44a66378-180b-4593-8031-e5c4538d9380/event/9e894aac-5921-40c1-befd-07be5d343962/version/1.0.0","$schema":"http://json-schema.org/draft-07/schema#","title":"Todos Toggled","description":"Called when todos are toggled.","type":"object","properties":{},"additionalProperties":false,"required":[]},
      }),
      new AmplitudePlugin(options.environment === 'production'
        ? '08ed2d4a871a818f51a11d5cf406b322'
        : '08ed2d4a871a818f51a11d5cf406b322',
        destinations.amplitude,
      ),
      ...plugins,
    ] });
  }

  /**
    * Alias a user ID to another user ID.
    * @param userId The user's new ID.
    * @param previousId The user's previous ID.
    */
    alias(userId: string, previousId?: string) {
      itly.alias(userId, previousId);
    }

  /**
  * Set or update a user's properties.
  * @param userId The user's ID.
  * @param properties Required and optional user properties.
  */
  identify(userId: string, properties: IdentifyProperties) {
    itly.identify(userId, properties)
  }

  group(groupId: string) {
    itly.group(groupId)
  }
  
  page(category: string, name: string) {
    itly.page(category, name);
  }

  /**
   * Called when a todo is deleted.
   * 
   * Owner: Patrick Thompson
   */
  todoDeleted() {
    itly.track({
      name: 'Todo Deleted',
      id: '047da53e-da2f-4aed-8e4c-81ce3a61a42a',
      version: '3.0.0',
      properties: undefined,
    });
  }

  /**
   * Called when todos are cleared.
   * 
   * Owner: Patrick Thompson
   */
  todosCleared() {
    itly.track({
      name: 'Todos Cleared',
      id: '2a656e32-0e2b-4a0c-8132-9750768101be',
      version: '3.0.1',
      properties: undefined,
    });
  }

  /**
   * Called when a todo is created.
   * 
   * Owner: Patrick Thompson
   */
  todoCreated() {
    itly.track({
      name: 'Todo Created',
      id: '5a12a386-91a9-47e4-91fc-52d93bbfcd78',
      version: '3.0.0',
      properties: undefined,
    });
  }

  /**
   * Called when a todo is toggled.
   * 
   * Owner: Patrick Thompson
   */
  todoToggled() {
    itly.track({
      name: 'Todo Toggled',
      id: '9df75462-3736-4a9e-9e00-46b504555be2',
      version: '1.0.0',
      properties: undefined,
    });
  }

  /**
   * Called when todos are toggled.
   * 
   * Owner: Patrick Thompson
   */
  todosToggled() {
    itly.track({
      name: 'Todos Toggled',
      id: '9e894aac-5921-40c1-befd-07be5d343962',
      version: '1.0.0',
      properties: undefined,
    });
  }
  
  reset() {
    itly.reset();
  }
}

export default new Itly();
