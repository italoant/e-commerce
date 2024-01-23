import Entity from 'src/common/entity/entity';
import { ClientType } from './user-enum';

export class User extends Entity {
  _name: string;
  _email: string;
  _password: string;
  _access_token: string;
  _creationDate: Date;
  _updatedDate: Date;
  _type: ClientType;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    access_token: string,
    creationDate: Date,
    updatedDate: Date,
    type: ClientType,
  ) {
    super(id);

    this._name = name;
    this._email = email;
    this._password = password;
    this._access_token = access_token;
    this._creationDate = creationDate;
    this._updatedDate = updatedDate;
    this._type = type;
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

  get access_token(): string {
    return this._access_token;
  }

  private set access_token(access_token: string) {
    this._access_token = access_token;
  }

  get creationDate(): Date {
    return this._creationDate;
  }

  private set creationDate(creationDate: Date) {
    this._creationDate = creationDate;
  }
  get updatedDate(): Date {
    return this._updatedDate;
  }

  private set updatedDate(updatedDate: Date) {
    this._updatedDate = updatedDate;
  }

  get type(): ClientType {
    return this._type;
  }

  private set type(type: ClientType) {
    this._type = type;
  }
}
