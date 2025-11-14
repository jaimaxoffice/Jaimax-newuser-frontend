/**
 * Universal masking function for all sensitive data types
 * @param {string} value - The value to mask
 * @param {string} type - Type of data ('bank', 'pan', 'mobile', 'upi', 'ifsc', 'aadhar', 'email', 'generic')
 * @param {object} options - Additional options for custom masking
 * @returns {string} - Masked value
 */
export const maskData = (value, type = 'generic', options = {}) => {
  if (!value) return value;
  
  const str = String(value);
  const { showFirst = 2, showLast = 4, maskChar = '*' } = options;

  switch (type.toLowerCase()) {
    // Bank Account: 12345678901234 -> 12********1234
    case 'bank':
    case 'account':
      return `${str.slice(0, 2)}${'*'.repeat(Math.max(0, str.length - 6))}${str.slice(-4)}`;

    // PAN: ABCDE1234F -> ABC*****4F
    case 'pan':
      return `${str.slice(0, 3)}${'*'.repeat(Math.max(0, str.length - 5))}${str.slice(-2)}`;

    // Mobile: +91 9876543210 -> +91 ******3210
    case 'mobile':
    case 'phone':
      if (str.includes('+')) {
        const parts = str.split(' ');
        const countryCode = parts[0];
        const number = parts[1] || '';
        return `${countryCode} ${'*'.repeat(Math.max(0, number.length - 4))}${number.slice(-4)}`;
      }
      return `${'*'.repeat(Math.max(0, str.length - 4))}${str.slice(-4)}`;

    // UPI: john.doe@paytm -> jo******@paytm
    case 'upi':
      const [username, domain] = str.split('@');
      return `${username.slice(0, 2)}${'*'.repeat(Math.max(0, username.length - 2))}@${domain}`;

    // IFSC: SBIN0001234 -> SBIN*******
    case 'ifsc':
      return `${str.slice(0, 4).toUpperCase()}${'*'.repeat(Math.max(0, str.length - 4))}`;

    // Aadhar: 123456789012 -> ********9012
    case 'aadhar':
    case 'aadhaar':
      return `${'*'.repeat(Math.max(0, str.length - 4))}${str.slice(-4)}`;

    // Email: john.doe@email.com -> jo******@email.com
    case 'email':
      const [emailUser, emailDomain] = str.split('@');
      return `${emailUser.slice(0, 2)}${'*'.repeat(Math.max(0, emailUser.length - 2))}@${emailDomain}`;

    // Generic or custom masking
    case 'generic':
    default:
      return `${str.slice(0, showFirst)}${maskChar.repeat(Math.max(0, str.length - showFirst - showLast))}${str.slice(-showLast)}`;
  }
};