import { env } from 'process';
import { PERMISSIONS } from '../../lib/utils/constants';

const JWT_PRIV_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAqvH1YXxiWkYAEU50CKzwWFrXfs2kO5lP9BquuL3thKpXHqBH
m9iwgBXiz43GjM87CBpviOLPhUYA52PwI4EFOswGYyletBQ9XYSKgcBuYlpI/liY
PyWI/A6Su7uHIkKcCM6FOI1xpQWaOTRmQwO9xnw3vJKx48UfmLlIrtk+QzAs3QsO
fTzqjWWlq+kAyseJQVTIwdYJUabYRVePr/l3Z+ps54gad/5cy0aKOcl8nh/PtkO9
r2r0TjulBsKpddQJ3ULTLUGwTOwQTRQhYriH3oRqTgJJ37RM1uTOAJDqbz5Z5hhK
rmr4wdTU5iiqfb5z8IrcwfK2kcWAHQNub+6f2wIDAQABAoIBADfrxSjp5sa/RYBj
2MOJx2ov9XTu0r4IbkZdgDDBOPUAQFWtex95aGvOPQ9GwuAHXrlM5JW0FMz1VJBd
eg4zQ8GzQpenzeo9AMIZ/LFrgPC9tkk2ND/cCI7kOY4eT5uejKq43I3ef4HLbmMu
SBG+JJPMyPLwTi9Dqg1s92DzglG55HkEP7yJn8J0mB4xfcUiQE82C8eFVKnHTqO9
hG624heRvVdZKjkVC9AAQvRSMFHRuCQJAtu0pjLME9tnz/bM8EuJ3MxVzRxrdxM0
MDxr6HGqlpFzZnjPbUrIcypyZS30aREtbQNhQx7UfSX4OtNDAkj/uLaBy/7ODNBq
IaDUcfkCgYEA4kVWPy4vAsaVYW9RzhfctyvxAerGWOdRmj0kmiJkqgvpgU8Hu6SF
IkF954FiFHVnoro8st9FZudbMkAHrMdihC+F2BSfYGVHTDb2r85HYBq7mBy4xWJf
n/AaJdgiTxFhlgOLkW/hunYNHF3Z7XmwJGE0vGeiXBTsqk1m/v8p0ucCgYEAwWe7
M3uyZihduRephxbix3ZtyIRYfYWqe6uPXg6Avm2L9e94+/DeZJHIgTswvvUAzOxY
7AVfeoSePYzVSc/hBlXvaj1F+ug+55EODwA03hhEAAhzJ/5B5CY8iZQhwpB17iYI
lXW5NCtIJR37T155WqEFUGl5AY6UIc8ZKDOqoO0CgYBQJdtM+eDxDMJxButlIxKt
V0VBNpYXe6huB+ZlKnWZvipyATpt/vKhla0xSaUiNgwFmg5SFcARmTW2cPPHAcEl
rWetiHCDxpwgpP9wepLRueZlFRdl41iX4IaCjTJp63AzoQHY/FZqo9I1EBFXitkX
qc7yRYs/LrI+CLjI7j00VQKBgQC7C61aryjr7+IkniPQiGuu6HRoVsaWLu2gSV2Q
Y4pToPKZWY6yalNLBErb4PjV1XF+vp2JNfEPNq8ra8bjae6BCB9RqgzCCla78eec
zmBS4zjwpztn1Fi5Y9lsXR0BZGEJfzMSCRaiw7E0ZHimXAIVimDvUfI7dT8CK55y
6PT+SQKBgFSuaYpk1Y/NexdOYz5CxiFZDkHmpF4UcM+dnbMtsX5gRnZHFMWMKJxO
Cez/D3BAM98WvjHE4FspwFvO6OdN2dp6sZ4nGQOCc0o54hAomQwDl0U/aCW7d+7p
z37AArOUm3L9UYea3QbjRp2Po0/HqLWpk8KNplZHM/oYHZ4LXoRf
-----END RSA PRIVATE KEY-----`;

const JWT_PUB_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqvH1YXxiWkYAEU50CKzw
WFrXfs2kO5lP9BquuL3thKpXHqBHm9iwgBXiz43GjM87CBpviOLPhUYA52PwI4EF
OswGYyletBQ9XYSKgcBuYlpI/liYPyWI/A6Su7uHIkKcCM6FOI1xpQWaOTRmQwO9
xnw3vJKx48UfmLlIrtk+QzAs3QsOfTzqjWWlq+kAyseJQVTIwdYJUabYRVePr/l3
Z+ps54gad/5cy0aKOcl8nh/PtkO9r2r0TjulBsKpddQJ3ULTLUGwTOwQTRQhYriH
3oRqTgJJ37RM1uTOAJDqbz5Z5hhKrmr4wdTU5iiqfb5z8IrcwfK2kcWAHQNub+6f
2wIDAQAB
-----END PUBLIC KEY-----`;

const config = {
  // URI for centrifuge node
  centrifugeUrl: env.CENTRIFUGE_URL || 'http://127.0.0.1:8082',
  // The domain on which the application is hosted. Used for building links
  // in emails
  applicationHost:
    env.CENTRIFUGE_APPLICATION_HOST || 'http://gateway.centrifuge.io',
  // Port on which the application will run
  applicationPort: env.CENTRIFUGE_APPLICATION_PORT || '3001',
  sessionSecret: env.CENTRIFUGE_SESSION_SECRET || 'centrifuge',
  email: {
    host: env.CENTRIFUGE_EMAIL_CLIENT_HOST || 'smtp.sendgrid.net',
    port: env.CENTRIFUGE_EMAIL_CLIENT_PORT || 465,
    // node treats boolean as strings
    secure: env.CENTRIFUGE_EMAIL_CLIENT_SECURE === 'false' ? false : true,
    user: env.CENTRIFUGE_EMAIL_CLIENT_USER || 'apikey',
    password: env.CENTRIFUGE_EMAIL_SERVICE_APIKEY,
    from: env.CENTRIFUGE_ADMIN_EMAIL || 'gateway@centrifuge.io',
  },
  // We use replace to create a new database without changing the deployment config
  dbPath: env.CENTRIFUGE_DB_PATH
    ? env.CENTRIFUGE_DB_PATH.replace('db', 'db1')
    : './db',
  // Default admin user that will be created
  admin: {
    name: env.CENTRIFUGE_ADMIN_USER || 'admin',
    email: env.CENTRIFUGE_ADMIN_EMAIL || 'gateway@centrifuge.io',
    password: env.CENTRIFUGE_ADMIN_PASSWORD || 'admin',
    // Centrifuge Identity Address
    account: env.CENTRIFUGE_ADMIN_ACCOUNT,
    chain: {
      centrifuge_chain_account: {
        id: env.CENTRIFUGE_CHAIN_ID,
        secret: env.CENTRIFUGE_CHAIN_SECRET,
        ss_58_address: env.CENTRIFUGE_CHAIN_ADDRESS,
      },
    },
    permissions: [
      PERMISSIONS.CAN_MANAGE_USERS,
      PERMISSIONS.CAN_MANAGE_SCHEMAS,
      PERMISSIONS.CAN_VIEW_DOCUMENTS,
      PERMISSIONS.CAN_MANAGE_DOCUMENTS,
    ],
  },
  inviteOnly: Boolean(env.CENTRIFUGE_INVITE_ONLY || true),
  ethNetwork: env.ETH_NETWORK || 'mainnet',
  ethProvider:
    env.ETH_PROVIDER ||
    'https://mainnet.infura.io/v3/55b957b5c6be42c49e6d48cbb102bdd5',
  jwtPrivKey: env.JWT_PRIV_KEY || JWT_PRIV_KEY,
  jwtPubKey: env.JWT_PUB_KEY || JWT_PUB_KEY,
};
export default config;
