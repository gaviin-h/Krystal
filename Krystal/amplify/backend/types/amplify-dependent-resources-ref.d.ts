export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "krystal3c9b66f0": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "function": {
        "SuggestEngine": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "FilterSuggest": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "krystalLayerOne": {
            "Arn": "string"
        },
        "EntanglementRating": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "api": {
        "KrystalBackend": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    }
}