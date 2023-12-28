/**
 * Event received by lambda
 * @typedef {Object} AppFlowEventRequest
 * @property {'DescribeConnectorConfigurationRequest'|'ValidateConnectorRuntimeSettingsRequest'|'ValidateCredentialsRequest'|'ListEntitiesRequest'|'DescribeEntityRequest'|'QueryDataRequest'|'WriteDataRequest'} type - Event Type
 * @property {'SOURCE_AND_DESTINATION'|'SOURCE'|'DESTINATION'|'CONNECTOR_PROFILE'} scope - Event Scope
 * @property {AppsFlowCredentials} credentials -
 * @property {string} entityIdentifier -
 * @property {'INSERT'|'UPDATE'|'UPSERT'|'DELETE'} operation -
 * @property {string[]} selectedFieldNames -
 */

/**
 * @typedef {Object} AppsFlowCredentials
 * @property {string} secretArn
 * @property {'BasicAuth'|''} authenticationType
 */

/**
 * Event received by lambda
 * @typedef {Object} AppFlowEventResponse
 * @property {string} connectorOwner -
 * @property {string} connectorName -
 * @property {string} connectorVersion -
 * @property {boolean} isSuccess -

 */

/**
 * AWS Lambda Context object
 * @typedef {Object} LambdaContext
 * @property {string} functionName - The name of the Lambda function.
 * @property {string} functionVersion - The version of the function.
 * @property {string} invokedFunctionArn - The Amazon Resource Name (ARN) that's used to invoke the function. Indicates if the invoker specified a version number or alias.
 * @property {string} memoryLimitInMB - The amount of memory that's allocated for the function.
 * @property {string} awsRequestId - The identifier of the invocation request.
 * @property {string} logGroupName - The log group for the function.
 * @property {string} logStreamName - The log stream for the function instance.
 * @property {object} identity - The identity of the user that invoked the function.
 * @property {object} clientContext - Client context that's provided to Lambda by the client application.
 */


export const Typedefs = {}

/**
 *
 * @type {AppFlowEventRequest}
 */
export const AppFlowEventRequest = {}

/**
 *
 * @type {AppFlowEventResponse}
 */
export const AppFlowResponse = {}

/**
 *
 * @type {LambdaContext}
 */
export const LambdaContext = {}
