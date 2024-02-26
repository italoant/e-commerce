import Entity from 'src/common/entity/entity';
import { ClientType } from './user-enum';

export class User extends Entity {
  _name: string;
  _email: string;
  _password: string;
  _creation_date: Date;
  _updated_date: Date;
  _type: ClientType;
  _isValidEmail: boolean;
  _code: string;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    creation_date: Date,
    updated_date: Date,
    type: ClientType,
    isValidEmail: boolean,
    code: string,
  ) {
    super(id);

    this._name = name;
    this._email = email;
    this._password = password;
    this._creation_date = creation_date;
    this._updated_date = updated_date;
    this._type = type;
    this._isValidEmail = isValidEmail;
    this._code = code;
  }

  get name(): string {
    return this._name;
  }

  private set name(name: string) {
    this._name = name;
  }

  get email(): string {
    return this._email;
  }

  private set email(email: string) {
    this._email = email;
  }
  get password(): string {
    return this._password;
  }

  private set password(password: string) {
    this._password = password;
  }

  get creation_date(): Date {
    return this._creation_date;
  }

  private set creation_date(creation_date: Date) {
    this._creation_date = creation_date;
  }
  get updated_date(): Date {
    return this._updated_date;
  }

  private set updated_date(updated_date: Date) {
    this._updated_date = updated_date;
  }

  get type(): ClientType {
    return this._type;
  }

  private set type(type: ClientType) {
    this._type = type;
  }

  get isValidEmail(): boolean {
    return this._isValidEmail;
  }

  private set isValidEmail(isValidEmail: boolean) {
    this._isValidEmail = isValidEmail;
  }

  get code(): string {
    return this._code;
  }

  private set code(code: string) {
    this._code = code;
  }
}
