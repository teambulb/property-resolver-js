
var propertyPrefix = "${";
var propertyPostfix = "}";
var propertyDelimeter = ".";
var allSettings;

function isDict(v) {
    return (typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof Date));
}
function isString(s) {
    return (typeof s === 'string' && s !== null);
}

var getValueForSettingsKey = function (keyName, settings) {
    var namespaceLookup = keyName.split(propertyDelimeter);
    var value = settings;
    for (var i in namespaceLookup) {
        value = value[namespaceLookup[i]];
        if (value === undefined) {
            //console.log("could not resolve property: " + keyName);
            return null;
        }
    }

    return value;
}

var resolvePlaceholdersRecursive = function(json) {
    if (isDict(json)) {
        for (var key in json) {
            var subJson = json[key];
            var resolvedDict = resolvePlaceholdersRecursive(subJson);
            json[key] = resolvedDict;
        }
    }
    else if (isString(json) && json.includes(propertyPrefix) && json.includes(propertyPostfix)) {
        var prefixIndex = json.lastIndexOf(propertyPrefix);
        var postfixIndex = json.lastIndexOf(propertyPostfix);
        var placeholderKeyToResolve = json.substring(prefixIndex + propertyPrefix.length, postfixIndex);
        var resolvedPlaceholderKeyValue = getValueForSettingsKey(placeholderKeyToResolve, allSettings);
        resolvedPlaceholderKeyValue = resolvedPlaceholderKeyValue === null ? "???" : resolvedPlaceholderKeyValue;
        var jsonAfterResolution = json.replace(propertyPrefix + placeholderKeyToResolve + propertyPostfix, resolvedPlaceholderKeyValue);

        //console.log("Found Key to resolve: " + placeholderKeyToResolve + " in " + json + " resolved to " +
        // resolvedPlaceholderKeyValue);

        // Call it again in case there are more placeholders to resolve in the same string.
        var resolved = resolvePlaceholdersRecursive(jsonAfterResolution);
        json = resolved;
    }
    return json;
}

var resolvePlaceholders = function(propertiesJson, placeholderPrefix, placeholderSuffix, placeholderDelimeter) {
    allSettings = propertiesJson;
    propertyPrefix = placeholderPrefix;
    propertyPostfix = placeholderSuffix;
    propertyDelimeter = placeholderDelimeter;
    return resolvePlaceholdersRecursive(propertiesJson);
}

exports.resolve = resolvePlaceholders;

exports.resolveValue = getValueForSettingsKey;
