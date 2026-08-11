var ERROR_LOG_SHEET_NAME_ = 'ErrorLog';
var ERROR_LOG_HEADERS_ = ['Timestamp', 'Level', 'Function', 'Message', 'Context'];
var ERROR_LOG_LEVELS_ = ['info', 'warn', 'error'];
var ERROR_LOG_CONTEXT_LIMIT_ = 20000;
var ERROR_LOG_MESSAGE_LIMIT_ = 5000;

/**
 * Run once in a safe/test spreadsheet to create ErrorLog and verify writes.
 * @return {string} Created/verified sheet name.
 */
function setupErrorLog_() {
  logError_('setupErrorLog_', 'ErrorLog initialized', 'info', {
    sheetName: ERROR_LOG_SHEET_NAME_
  });

  var ss = getLogSpreadsheet_();
  var sheet = ss.getSheetByName(ERROR_LOG_SHEET_NAME_);
  if (!sheet) {
    throw new Error('ErrorLog could not be initialized. Check Apps Script execution logs.');
  }
  return sheet.getName();
}

/**
 * Central logger for meaningful operational milestones and failures.
 * This function never throws so logging cannot create a recursive failure.
 *
 * @param {string} functionName Function/component producing the event.
 * @param {*} message Specific event or exception.
 * @param {string=} level info, warn, or error. Defaults to error.
 * @param {*=} context Minimal context. Do not pass secrets or unnecessary PII.
 */
function logError_(functionName, message, level, context) {
  var lock = null;
  try {
    lock = LockService.getDocumentLock();
    lock.waitLock(5000);

    var sheet = ensureErrorLogSheet_();
    var safeLevel = normalizeLogLevel_(level);
    var safeFunction = protectSheetText_(truncateLogText_(String(functionName || 'unknown'), 200));
    var safeMessage = protectSheetText_(truncateLogText_(messageToLogString_(message), ERROR_LOG_MESSAGE_LIMIT_));
    var safeContext = protectSheetText_(safeContextString_(context));

    sheet.appendRow([
      new Date(),
      safeLevel,
      safeFunction,
      safeMessage,
      safeContext
    ]);
  } catch (loggerError) {
    // Local fallback only. Never call logError_ from this catch.
    console.error(
      '[ErrorLog write failed] function=%s; original=%s; logger=%s',
      String(functionName || 'unknown'),
      truncateLogText_(messageToLogString_(message), 1000),
      loggerError && loggerError.stack ? loggerError.stack : String(loggerError)
    );
  } finally {
    try {
      if (lock && lock.hasLock()) {
        lock.releaseLock();
      }
    } catch (releaseError) {
      console.error('[ErrorLog lock release failed] %s', String(releaseError));
    }
  }
}

function logInfo_(functionName, message, context) {
  logError_(functionName, message, 'info', context);
}

function logWarn_(functionName, message, context) {
  logError_(functionName, message, 'warn', context);
}

/**
 * Keep this project-specific adapter simple. For a standalone script, replace
 * getActiveSpreadsheet() with the project's existing openById() path. Do not
 * introduce a new Sheet ID source without an approved decision.
 */
function getLogSpreadsheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error(
      'No active spreadsheet. Bind the script to the target Sheet or adapt getLogSpreadsheet_() to the existing openById() mechanism.'
    );
  }
  return ss;
}

function ensureErrorLogSheet_() {
  var ss = getLogSpreadsheet_();
  var sheet = ss.getSheetByName(ERROR_LOG_SHEET_NAME_);

  if (!sheet) {
    sheet = ss.insertSheet(ERROR_LOG_SHEET_NAME_);
    initializeErrorLogHeaders_(sheet);
    return sheet;
  }

  if (sheet.getLastRow() === 0) {
    initializeErrorLogHeaders_(sheet);
    return sheet;
  }

  var actualHeaders = sheet.getRange(1, 1, 1, ERROR_LOG_HEADERS_.length).getDisplayValues()[0];
  if (actualHeaders.join('|') !== ERROR_LOG_HEADERS_.join('|')) {
    throw new Error(
      'ErrorLog header mismatch. Expected: ' + ERROR_LOG_HEADERS_.join(' | ') +
      '; actual: ' + actualHeaders.join(' | ')
    );
  }

  return sheet;
}

function initializeErrorLogHeaders_(sheet) {
  sheet.getRange(1, 1, 1, ERROR_LOG_HEADERS_.length).setValues([ERROR_LOG_HEADERS_]);
  sheet.setFrozenRows(1);
  sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
}

function normalizeLogLevel_(level) {
  var normalized = String(level || 'error').toLowerCase();
  return ERROR_LOG_LEVELS_.indexOf(normalized) >= 0 ? normalized : 'error';
}

function messageToLogString_(message) {
  if (message instanceof Error) {
    return message.stack || message.toString();
  }
  if (message === null || typeof message === 'undefined') {
    return '';
  }
  return String(message);
}

function safeContextString_(context) {
  if (context === null || typeof context === 'undefined') {
    return '';
  }

  if (typeof context === 'string') {
    return truncateLogText_(context, ERROR_LOG_CONTEXT_LIMIT_);
  }

  var seen = [];
  var serialized;
  try {
    serialized = JSON.stringify(context, function(key, value) {
      if (isSensitiveLogKey_(key)) {
        return '[REDACTED]';
      }
      if (value instanceof Error) {
        return {
          name: value.name,
          message: value.message,
          stack: value.stack
        };
      }
      if (value && typeof value === 'object') {
        if (seen.indexOf(value) >= 0) {
          return '[Circular]';
        }
        seen.push(value);
      }
      return value;
    });
  } catch (serializationError) {
    serialized = '[Unserializable context: ' + serializationError.toString() + ']';
  }

  if (typeof serialized === 'undefined') {
    serialized = String(context);
  }
  return truncateLogText_(serialized, ERROR_LOG_CONTEXT_LIMIT_);
}

function isSensitiveLogKey_(key) {
  return /password|passcode|token|secret|authorization|cookie|session|api[-_]?key|client[-_]?secret/i.test(String(key || ''));
}

function truncateLogText_(value, maxLength) {
  var text = String(value || '');
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '…[truncated]';
}

/** Prevent untrusted log content from becoming a Sheet formula. */
function protectSheetText_(value) {
  var text = String(value || '');
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}
