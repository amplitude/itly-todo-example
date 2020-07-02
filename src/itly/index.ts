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
import SegmentPlugin, { SegmentOptions } from '@itly/plugin-segment';
import AmplitudePlugin, { AmplitudeOptions } from '@itly/plugin-amplitude';
import MixpanelPlugin, { MixpanelOptions } from '@itly/plugin-mixpanel';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Event = BaseEvent;
export type Properties = BaseProperties;
export interface Plugin extends BasePlugin {};
export class PluginBase extends BasePluginBase {};
export type ValidationOptions = BaseValidationOptions;
export type ValidationResponse = BaseValidationResponse;
export type IterativelyOptions = WithOptional<BaseIterativelyOptions, 'url' | 'environment'>;

export interface ContextProperties {
  /**
   * description for context requiredString
   */
  requiredString: string;
  /**
   * description for context optionalEnum
   */
  optionalEnum?: "Value 1" | "Value 2";
}
export interface IdentifyProperties {
  /**
   * Description for identify optionalArray
   */
  optionalArray?: string[];
  /**
   * Description for identify requiredNumber
   */
  requiredNumber: number;
}
export interface GroupProperties {
  /**
   * Description for group requiredBoolean
   */
  requiredBoolean: boolean;
  /**
   * Description for group optionalString
   */
  optionalString?: string;
}
export interface EventWithOptionalPropertiesProperties {
  /**
   * | Rule | Value |
   * |---|---|
   * | Type | number |
   */
  optionalNumber?: number;
  /**
   * | Rule | Value |
   * |---|---|
   * | Item Type | string |
   */
  optionalArrayString?: string[];
  /**
   * | Rule | Value |
   * |---|---|
   * | Item Type | number |
   */
  optionalArrayNumber?: number[];
  /**
   * Optional String property description
   */
  optionalString?: string;
  optionalBoolean?: boolean;
}
export interface EventNoPropertiesProperties {}
export interface EventWithAllPropertiesProperties {
  /**
   * Event 2 Property - Const
   *
   * | Rule | Value |
   * |---|---|
   * | Const value | some-const-value |
   */
  requiredConst: {
    [k: string]: any;
  };
  /**
   * Event 2 Property - Integer    *     * Examples:    * 5, 4, 3
   *
   * | Rule | Value |
   * |---|---|
   * | Type | integer |
   */
  requiredInteger: number;
  /**
   * Event 2 Property - Optional String    *     * Examples:    * Some string, or another
   */
  optionalString?: string;
  /**
   * Event 2 Property - Number
   *
   * | Rule | Value |
   * |---|---|
   * | Type | number |
   */
  requiredNumber: number;
  /**
   * Event 2 Property - String
   */
  requiredString: string;
  /**
   * Event 2 Property - Array
   *
   * | Rule | Value |
   * |---|---|
   * | Min Items | 0 |
   * | Item Type | string |
   */
  requiredArray: string[];
  /**
   * Event 2 Property - Enum
   *
   * | Rule | Value |
   * |---|---|
   * | Enum Values | Enum1, Enum2 |
   */
  requiredEnum: "Enum1" | "Enum2";
  /**
   * Event 2 Property - Boolean
   */
  requiredBoolean: boolean;
}
export interface EventMaxIntForTestProperties {
  /**
   * property to test schema validation
   *
   * | Rule | Value |
   * |---|---|
   * | Type | integer |
   * | Max Value | 10 |
   */
  intMax10: number;
}
export interface EventObjectTypesProperties {
  /**
   * Property Object Type
   */
  requiredObject: {
    [k: string]: any;
  };
  /**
   * Property Object Array Type
   *
   * | Rule | Value |
   * |---|---|
   * | Item Type | object |
   */
  requiredObjectArray: {
    [k: string]: any;
  }[];
}

export interface Options extends BaseOptions {
  /**
   * Analytics provider-specific configuration. Default is null.
   */
  destinations?: {
    iteratively?: IterativelyOptions,
    segment?: SegmentOptions,
    amplitude?: AmplitudeOptions,
    mixpanel?: MixpanelOptions
  };
  /**
   * Additional context properties to add to all events. Default is none.
   */
  context: ContextProperties;
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
        ? '5J--hWBlXUX9IEsBSVe3z5A6N3-Ah-Rr'
        : 'jH-eGAT3RIvzu6BHQXKfoVY2ijS7E6_-',
      {
        url: 'https://api-test.iterative.ly/t/version/79154a50-f057-4db5-9755-775e4e9f05e6',
        environment: options.environment || 'development',
        ...destinations.iteratively,
      }),
      new SchemaValidatorPlugin({
        'context': {"$id":"https://iterative.ly/company/77b37977-cb3a-42eb-bce3-09f5f7c3adb7/context","$schema":"http://json-schema.org/draft-07/schema#","title":"Context","description":"","type":"object","properties":{"requiredString":{"description":"description for context requiredString","type":"string"},"optionalEnum":{"description":"description for context optionalEnum","enum":["Value 1","Value 2"]}},"additionalProperties":false,"required":["requiredString"]},
        'group': {"$id":"https://iterative.ly/company/77b37977-cb3a-42eb-bce3-09f5f7c3adb7/group","$schema":"http://json-schema.org/draft-07/schema#","title":"Group","description":"","type":"object","properties":{"requiredBoolean":{"description":"Description for group requiredBoolean","type":"boolean"},"optionalString":{"description":"Description for group optionalString","type":"string"}},"additionalProperties":false,"required":["requiredBoolean"]},
        'identify': {"$id":"https://iterative.ly/company/77b37977-cb3a-42eb-bce3-09f5f7c3adb7/identify","$schema":"http://json-schema.org/draft-07/schema#","title":"Identify","description":"","type":"object","properties":{"optionalArray":{"description":"Description for identify optionalArray","type":"array","uniqueItems":false,"items":{"type":"string"}},"requiredNumber":{"description":"Description for identify requiredNumber","type":"number"}},"additionalProperties":false,"required":["requiredNumber"]},
        'Event No Properties': {"$id":"https://iterative.ly/company/77b37977-cb3a-42eb-bce3-09f5f7c3adb7/event/26af925a-be3a-40e5-947d-33da66a5352f/version/1.0.0","$schema":"http://json-schema.org/draft-07/schema#","title":"Event No Properties","description":"Event w no properties description","type":"object","properties":{},"additionalProperties":false,"required":[]},
        'Event Object Types': {"$id":"https://iterative.ly/company/77b37977-cb3a-42eb-bce3-09f5f7c3adb7/event/aea72ecc-5a10-4bd7-99a6-81a464aabaed/version/1.0.0","$schema":"http://json-schema.org/draft-07/schema#","title":"Event Object Types","description":"Event with Object and Object Array","type":"object","properties":{"requiredObject":{"description":"Property Object Type","type":"object"},"requiredObjectArray":{"description":"Property Object Array Type","type":"array","items":{"type":"object"}}},"additionalProperties":false,"required":["requiredObject","requiredObjectArray"]},
        'Event With All Properties': {"$id":"https://iterative.ly/company/77b37977-cb3a-42eb-bce3-09f5f7c3adb7/event/311ba144-8532-4474-a9bd-8b430625e29a/version/1.0.0","$schema":"http://json-schema.org/draft-07/schema#","title":"Event With All Properties","description":"Event w all properties description","type":"object","properties":{"requiredConst":{"description":"Event 2 Property - Const","const":"some-const-value"},"requiredInteger":{"description":"Event 2 Property - Integer    *     * Examples:    * 5, 4, 3","type":"integer"},"optionalString":{"description":"Event 2 Property - Optional String    *     * Examples:    * Some string, or another","type":"string"},"requiredNumber":{"description":"Event 2 Property - Number","type":"number"},"requiredString":{"description":"Event 2 Property - String","type":"string"},"requiredArray":{"description":"Event 2 Property - Array","type":"array","minItems":0,"items":{"type":"string"}},"requiredEnum":{"description":"Event 2 Property - Enum","enum":["Enum1","Enum2"]},"requiredBoolean":{"description":"Event 2 Property - Boolean","type":"boolean"}},"additionalProperties":false,"required":["requiredConst","requiredInteger","requiredNumber","requiredString","requiredArray","requiredEnum","requiredBoolean"]},
        'Event With Optional Properties': {"$id":"https://iterative.ly/company/77b37977-cb3a-42eb-bce3-09f5f7c3adb7/event/00b99136-9d1a-48d8-89d5-25f165ff3ae0/version/1.0.0","$schema":"http://json-schema.org/draft-07/schema#","title":"Event With Optional Properties","description":"Event w optional properties description","type":"object","properties":{"optionalNumber":{"description":"","type":"number"},"optionalArrayString":{"description":"","type":"array","items":{"type":"string"}},"optionalArrayNumber":{"description":"","type":"array","items":{"type":"number"}},"optionalString":{"description":"Optional String property description","type":"string"},"optionalBoolean":{"description":"","type":"boolean"}},"additionalProperties":false,"required":[]},
        'EventMaxIntForTest': {"$id":"https://iterative.ly/company/77b37977-cb3a-42eb-bce3-09f5f7c3adb7/event/aa0f08ac-8928-4569-a524-c1699e7da6f4/version/1.0.0","$schema":"http://json-schema.org/draft-07/schema#","title":"EventMaxIntForTest","description":"Event to test schema validation","type":"object","properties":{"intMax10":{"description":"property to test schema validation","type":"integer","maximum":10}},"additionalProperties":false,"required":["intMax10"]},
      }),
      new SegmentPlugin(options.environment === 'production'
        ? 'CvU1TXIk6zSKuN7Vyx3FMT7cqzyvY5th'
        : 'CvU1TXIk6zSKuN7Vyx3FMT7cqzyvY5th',
        destinations.segment,
      ),
      new AmplitudePlugin(options.environment === 'production'
        ? '6c3a9cd0a22daafe3278346608a816cf'
        : '6c3a9cd0a22daafe3278346608a816cf',
        destinations.amplitude,
      ),
      new MixpanelPlugin(options.environment === 'production'
        ? '67a8ece0a81e35124d7c23c06b04c52f'
        : '67a8ece0a81e35124d7c23c06b04c52f',
        destinations.mixpanel,
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

  group(groupId: string, properties: GroupProperties) {
    itly.group(groupId, properties)
  }
  
  page(category: string, name: string) {
    itly.page(category, name);
  }

  /**
   * Event w optional properties description
   * 
   * Owner: Test codegen
   * @param properties The event's properties (e.g. optionalNumber)
   */
  eventWithOptionalProperties(properties: EventWithOptionalPropertiesProperties) {
    itly.track({
      name: 'Event With Optional Properties',
      id: '00b99136-9d1a-48d8-89d5-25f165ff3ae0',
      version: '1.0.0',
      properties: properties,
    });
  }

  /**
   * Event w no properties description
   * 
   * Owner: Test codegen
   */
  eventNoProperties() {
    itly.track({
      name: 'Event No Properties',
      id: '26af925a-be3a-40e5-947d-33da66a5352f',
      version: '1.0.0',
      properties: undefined,
    });
  }

  /**
   * Event w all properties description
   * 
   * Owner: Test codegen
   * @param properties The event's properties (e.g. requiredConst)
   */
  eventWithAllProperties(properties: EventWithAllPropertiesProperties) {
    itly.track({
      name: 'Event With All Properties',
      id: '311ba144-8532-4474-a9bd-8b430625e29a',
      version: '1.0.0',
      properties: properties,
    });
  }

  /**
   * Event to test schema validation
   * 
   * Owner: Test codegen
   * @param properties The event's properties (e.g. intMax10)
   */
  eventMaxIntForTest(properties: EventMaxIntForTestProperties) {
    itly.track({
      name: 'EventMaxIntForTest',
      id: 'aa0f08ac-8928-4569-a524-c1699e7da6f4',
      version: '1.0.0',
      properties: properties,
    });
  }

  /**
   * Event with Object and Object Array
   * 
   * Owner: Test codegen
   * @param properties The event's properties (e.g. requiredObject)
   */
  eventObjectTypes(properties: EventObjectTypesProperties) {
    itly.track({
      name: 'Event Object Types',
      id: 'aea72ecc-5a10-4bd7-99a6-81a464aabaed',
      version: '1.0.0',
      properties: properties,
    });
  }
  
  reset() {
    itly.reset();
  }
}

export default new Itly();
