import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

const bcryptCompare = async (text: string, hash: string) => {
  return await bcrypt.compare(text, hash);
};

const bcryptHash = async (text: string) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(text, salt);
};

const decrypt = (
  text: string,
  key = '',
  {
    inputEncoding = 'base64',
    outputEncoding = 'utf8',
    salt,
  }: { inputEncoding?: BufferEncoding; outputEncoding?: BufferEncoding; salt?: string } = {},
  algorithm = 'aes-256-cbc',
  iv = ''
) => {
  const decipher = crypto.createDecipheriv(algorithm, scrypt(key, salt), scrypt(iv, salt, 16));
  let decrypted = decipher.update(text, inputEncoding, outputEncoding);
  decrypted += decipher.final(outputEncoding);
  return decrypted;
};

const encrypt = (
  text: string,
  key = '',
  { encoding = 'base64', salt }: { encoding?: BufferEncoding; salt?: string } = {},
  algorithm = 'aes-256-cbc',
  iv = ''
) => {
  const cipher = crypto.createCipheriv(algorithm, scrypt(key, salt), scrypt(iv, salt, 16));
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString(encoding);
};

const indexHash = (text: string, size = 1000) => {
  const phi = size / 2 - 1;
  let num = 0;
  for (let i = 0; i < text.length; i++) {
    num = (num + phi * text.charCodeAt(i)) % size;
  }

  return num;
};

const scrypt = (key: string, salt: Buffer | string | undefined = Buffer.alloc(16), length = 32) => {
  let _salt = Buffer.from(salt);
  if (_salt.length < 16) {
    const originalSalt = _salt;
    _salt = Buffer.alloc(16);
    _salt.copy(originalSalt, 0, 0, originalSalt.length);
  }
  const buffer = crypto.scryptSync(key, _salt, length);
  return buffer;
};

const verify = (text: string, hash: string) => {
  const [salt, key] = hash.split(':');
  const hashed = scrypt(text, salt);
  return hashed.compare(Buffer.from(key));
};

const EncryptionUtils = {
  bcryptCompare,
  bcryptHash,
  decrypt,
  encrypt,
  indexHash,
  scrypt,
  verify,
};

export default EncryptionUtils;
