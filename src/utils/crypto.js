const SYSTEM_SALT = import.meta.env.VITE_SYSTEM_SALT;

export const deriveUserKeyBytes = async (password) => {
  const encoder = new TextEncoder();
  const passwordBytes = encoder.encode(password.trim());
  const saltBytes = encoder.encode(SYSTEM_SALT);

  const keyBuffer = await crypto.subtle
    .importKey("raw", passwordBytes, "PBKDF2", false, ["deriveBits"])
    .then((importedKey) =>
      crypto.subtle.deriveBits(
        {
          name: "PBKDF2",
          salt: saltBytes,
          iterations: 100000,
          hash: "SHA-256",
        },
        importedKey,
        256 // 256 bits = 32 bytes
      )
    );

  return new Uint8Array(keyBuffer);
};

export const encryptPayload = async (payload, password) => {
  const keyBytes = await deriveUserKeyBytes(password);
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    "AES-GCM",
    false,
    ["encrypt"]
  );

  const encoded = new TextEncoder().encode(JSON.stringify(payload));

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    encoded
  );

  // AES-GCM outputs ciphertext + authTag together
  const bytes = new Uint8Array(encryptedBuffer);

  return {
    consent: btoa(String.fromCharCode(...bytes)),
    terms: btoa(String.fromCharCode(...iv)),
  };
};

export const decryptPayload = async (encryptedData, iv, password) => {
  const keyBytes = await deriveUserKeyBytes(password);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    "AES-GCM",
    false,
    ["decrypt"]
  );

  const encryptedBytes = Uint8Array.from(atob(encryptedData), (c) =>
    c.charCodeAt(0)
  );
  const ivBytes = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));

  // crypto.subtle.decrypt expects ciphertext+authTag together
  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivBytes },
    cryptoKey,
    encryptedBytes
  );

  return JSON.parse(new TextDecoder().decode(decryptedBuffer));
};
