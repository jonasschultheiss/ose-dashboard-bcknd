export default interface ISecurityConfiguration {
  jwtSecret: string;
  jwtExpiresIn: string;
  encryptionSecret: string;
}
