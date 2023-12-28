import {
    SecretsManagerClient,
    GetSecretValueCommand
} from "@aws-sdk/client-secrets-manager";
import {AppFlowEventRequest, LambdaContext, AppFlowResponse} from "./typedefs.js";

console.log('Loading function');

const secretsClient = new SecretsManagerClient({
    region: "eu-west-1",
});

/**
 *
 * @param event {AppFlowEventRequest}
 * @param context {LambdaContext}
 * @returns {AppFlowResponse}
 */
export const handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    if (event.type === 'DescribeConnectorConfigurationRequest') {
        return {
            connectorOwner: "Me",
            connectorName: 'DemoConnector',
            connectorVersion: "1",
            isSuccess: true,
            connectorModes: ["SOURCE", "DESTINATION"],
            supportedApiVersions: ["v1.0"],
            operatorsSupported: ["PROJECTION", "NO_OP"],
            triggerFrequency: ["BYMINUTE", "HOURLY", "DAILY", "ONCE"],
            supportedWriteOperations: ["INSERT", "UPDATE", "UPSERT", "DELETE"],
            supportedTriggerTypes: ["SCHEDULED", "ONDEMAND"],
            authenticationConfig: {
                isBasicAuthSupported: true,
                isApiKeyAuthSupported: false
            },
            connectorRuntimeSetting: [{
                key: "myKey",
                dataType: "String",
                required: true,
                label: "myKeyLabel",
                description: "My Desc",
                scope: "CONNECTOR_PROFILE",
                connectorSuppliedValueOptions: null // or Array
            }],
        }
    } else if (event.type === 'ValidateConnectorRuntimeSettingsRequest') {
        switch (event.scope) {
            case "SOURCE_AND_DESTINATION":
                // TODO validate
                break;
            case "SOURCE":
                // TODO validate
                break;
            case "DESTINATION":
                // TODO validate
                break;
            case "CONNECTOR_PROFILE":
                // TODO validate
                break;
        }
        return {
            isSuccess: true,
            // errorsByInputField: null, // Error message for the invalid connector settings keys. Key will be ConnectorRuntimeSetting (string) provided as input and value will be the error message (string).
            // errorDetails: null        // Error details contains ErrorCode and ErrorMessage if the Operation is unsuccessful.
        }
    } else if (event.type === 'ValidateCredentialsRequest') {
        let connectionDetails = await fetchSecret(event.credentials.secretArn);
        console.log(`Connection Details: ${connectionDetails}`);
        // Here you get an object with credentials. TODO Validate against your server if the connection string is OK
        return {
            isSuccess: true
        }
    } else if (event.type === 'ListEntitiesRequest') {
        return {
            isSuccess: true,
            entities: [{
                entityIdentifier: "productEntity", // Unique identifier for the entity. Can be entityId, entityName, entityPath+name, entityUrl, etc.
                hasNestedEntities: false,
                isWritable: false,
                label: "Demo Product Object",
                description: "My Description"
            }],
            nextToken: null,
            cacheControl: {
                timeToLive: 600, // Time to keep the metadata in cache. Minimum is 600
                timeToLiveUnit: "SECONDS" // Change to DAYS if you don't change metadata often
            }
        }
    } else if (event.type === 'DescribeEntityRequest') {
        let entityIdentifier = event.entityIdentifier;
        return {
            isSuccess: true,
            errorDetails: null,
            entityDefinition: {
                entity: {
                    entityIdentifier: "productEntity", // Unique identifier for the entity. Can be entityId, entityName, entityPath+name, entityUrl, etc.
                    hasNestedEntities: false,
                    isWritable: false,
                    label: "Demo Product Object",
                    description: "My Description"
                },
                fields: [{
                    fieldName: "field_1",
                    dataType: "String", // Boolean, Date, String, Struct, DateTime, Float, Integer, Double, Long, BigInteger, BigDecimal, ByteArray, List, Map, Short
                    dataTypeLabel: "String Label",
                    label: "My Field 1",
                    description: "My custom test field 1",
                    isPrimaryKey: false,
                    // defaultValue: "",
                    isDeprecated: false,
                    // constraints: {}
                    readProperties: {
                        isRetrievable: true,
                        isNullable: true,
                        isQueryable: true,
                        isTimestampFieldForIncrementalQueries: true
                    },
                    writeProperties: {
                        isCreatable: true,
                        isUpdatable: true,
                        isNullable: true,
                        isUpsertable: true,
                        isDefaultedOnCreate: true
                    },
                    filterOperators: ["NOT_EQUAL_TO", "EQUAL_TO", "LESS_THAN", "LESS_THAN_OR_EQUAL_TO", "GREATER_THAN", "GREATER_THAN_OR_EQUAL_TO", "CONTAINS"],
                    customProperties: {}
                }],
                customProperties: {}
            },
            cacheControl: {
                timeToLive: 600, // Time to keep the metadata in cache. Minimum is 600
                timeToLiveUnit: "SECONDS" // Change to DAYS if you don't change metadata often
            }
        }
    } else if (event.type === 'QueryDataRequest') {
        let records = await fetchRecords(event.entityIdentifier, event.selectedFieldNames);
        return {
            isSuccess: true,
            errorDetails: null,
            nextToken: null,
            records: records// List of json serialized string of the entity record as per the entity metadata.
        }
    }

    throw new Error('Unsupported Event');
};
/**
 * @param {string} secret_name
 */
const fetchSecret = async function (secret_name) {
    let response = await secretsClient.send(
        new GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
        })
    );
    return response.SecretString;
}
/**
 *
 * @param entityIdentifier
 * @param selectedFieldNames
 * @returns {Promise<string[]>}
 */
const fetchRecords = async function (entityIdentifier, selectedFieldNames) {
    return [JSON.stringify({
        field_1: "some value"
    })];
}
