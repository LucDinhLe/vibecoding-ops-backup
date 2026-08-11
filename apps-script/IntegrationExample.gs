// Integration patterns only. Rename/adapt to the real project after baseline.
// Do not deploy this file verbatim as the production doPost implementation.

function exampleDoPost_(e) {
  var payload = null;
  try {
    logInfo_('doPost', 'Request received', {
      hasPostData: Boolean(e && e.postData && e.postData.contents)
    });

    payload = JSON.parse(e && e.postData && e.postData.contents ? e.postData.contents : '{}');

    // Replace this with the real business operation.
    var result = exampleProcessPayload_(payload);

    if (!result || result.ok === false) {
      logError_('doPost', 'Backend operation returned ok:false', 'error', {
        reason: result && result.message ? result.message : 'Unknown backend failure',
        payloadSummary: examplePayloadSummary_(payload)
      });
      return exampleJsonResponse_({ok: false, message: result && result.message ? result.message : 'Request failed'});
    }

    logInfo_('doPost', 'Request completed', {
      payloadSummary: examplePayloadSummary_(payload)
    });
    return exampleJsonResponse_({ok: true});
  } catch (e2) {
    logError_('doPost', 'Unhandled exception: ' + e2.toString(), 'error', {
      error: e2,
      payloadSummary: examplePayloadSummary_(payload)
    });
    return exampleJsonResponse_({ok: false, message: 'Internal error'});
  }
}

function exampleProcessPayload_(payload) {
  try {
    var ss = getLogSpreadsheet_();
    var responses = ss.getSheetByName('Responses');
    if (!responses) {
      logError_('exampleProcessPayload_', 'Responses sheet was not found', 'error', {
        sheetName: 'Responses'
      });
      return {ok: false, message: 'Responses sheet was not found'};
    }

    // Real ensureHeaders_/flatten_/appendRow logic belongs here after inspection.
    // responses.appendRow(...);
    return {ok: true};
  } catch (e) {
    logError_('exampleProcessPayload_', 'Sheet operation failed: ' + e.toString(), 'error', {
      error: e,
      sheetName: 'Responses',
      payloadSummary: examplePayloadSummary_(payload)
    });
    return {ok: false, message: e.toString()};
  }
}

function examplePayloadSummary_(payload) {
  if (!payload || typeof payload !== 'object') {
    return {type: typeof payload};
  }

  // Whitelist safe metadata. Do not log the full payload by default.
  return {
    keys: Object.keys(payload).slice(0, 20),
    hasData: Object.keys(payload).length > 0
  };
}

function exampleJsonResponse_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
