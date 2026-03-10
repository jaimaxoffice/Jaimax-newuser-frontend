// utils/sanitize.js
import DOMPurify from "dompurify";

/**
 * Sanitize a chat message completely
 * Removes:
 * - All HTML tags
 * - All attributes
 * - Script, style, iframe, onclick, onerror, etc.
 * - Any dangerous code
 * 
 * @param {string} message - raw user message
 * @returns {string} - safe, clean message
 */
export const sanitizeMessage = (message) => {

  console.log(message, "message")
  return DOMPurify.sanitize(message, {
    ALLOWED_TAGS: [],       // Remove all HTML tags
    ALLOWED_ATTR: [],       // Remove all attributes
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed'], // explicitly block dangerous tags
    FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover', 'style'], // block dangerous attributes
    KEEP_CONTENT: true,     // keep text content, remove dangerous code
    RETURN_TRUSTED_TYPE: false // return plain string, safe for React
  }).trim(); // remove extra spaces at start/end
};
