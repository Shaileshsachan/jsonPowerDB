$("#empId").focus();

function validateAndGetFormData() {
    var empIdVar = $("#empId").val();
    if (empIdVar === "") {
        alert("Employee ID value is Required");
        $("#empId").focus();
        return "";
    }

    var empNameVar = $("#empName").val();
    if (empNameVar === "") {
        alert("Employee Name is Required");
        $("#empName").focus();
        return "";
    }

    var empEmailVar = $("#empEmail").val();
    if (empEmailVar === "") {
        alert("Employee email is Required");
        $("#empEmail").focus();
        return "";
    }

    var jsonStrObj = {
        empId: empNameVar,
        empName: empNameVar,
        empEmail: empEmailVar,
    };

    return JSON.stringify(jsonStrObj);
}

function createPUTRequest(connToken, jsonObj, dbname, relName) {
    var putRequest = "{\n"
                + "\"token\" : \""
                + connToken
                + "\","
                + "\"dbName\": \""
                + dbName
                + "\",\n" + "\"cmd\" : \"PUT\",\n"
                + "\"rel\" : \""
                + relName + "\","
                + "\"jsonStr\": \n"
                + jsonObj
                + "\n"
                + "}";
    return putRequest;
}

function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}

function resetForm() {
    $("#empId").val("");
    $("#empName").val("");
    $("#empEmail").val("");
    $("#empId").val("");
}


function saveEmployee() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr == "") {
        return;
    }

    var putReqStr = createPUTRequest("90935516|-31948800485866363|90931517", jsonStr, "SAMPLE", "EMP-REL");

    alert(putReqStr);
    jQuery.ajaxSetup({async : false});
    var resultObj = executeCommand(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({async: true});
    alert(JSON.stringify(resultObj));

    resetForm();

}