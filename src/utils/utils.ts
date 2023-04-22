import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'superscreate123string';

export class Utils {
  
  static createHash = (str: string) => bcrypt.hash(str, 12);

  static compare = (givenPassword: string, password: string) =>
    bcrypt.compare(givenPassword, password);

  static signJwt = (payload: Object) => jwt.sign(payload, JWT_SECRET);

  static decryptJwt = (token: string):any => jwt.verify(token, JWT_SECRET);
}
