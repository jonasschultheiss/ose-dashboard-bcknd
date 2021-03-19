export default interface IToken {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresAt: number;
}
