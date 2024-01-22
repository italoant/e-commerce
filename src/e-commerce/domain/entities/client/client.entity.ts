import Entity from 'src/common/entity/entity';

export class Client extends Entity {
  _userId: string;
  _username: string;
  _userContact: number;
  _userAdress: string;
  _status: boolean;
  _creationDate: Date;
  _updatedDate: Date;

  constructor(
    id: string,
    userId: string,
    username: string,
    userContact: number,
    userAdress: string,
    status: boolean,
    creationDate: Date,
    updatedDate: Date,
  ) {
    super(id);

    this._userId = userId;
    this._username = username;
    this._userContact = userContact;
    this._userAdress = userAdress;
    this._status = status;
    this._creationDate = creationDate;
    this._updatedDate = updatedDate;
  }

  get userId(): string {
    return this._userId;
  }

  private set userId(userId: string) {
    this._userId = userId;
  }

  get username(): string {
    return this._username;
  }

  private set username(username: string) {
    this._username = username;
  }

  get userContact(): number {
    return this._userContact;
  }

  private set userContact(userContact: number) {
    this._userContact = userContact;
  }

  get userAdress(): string {
    return this._userAdress;
  }

  private set userAdress(userAdress: string) {
    this._userAdress = userAdress;
  }

  get status(): boolean {
    return this._status;
  }

  private set status(status: boolean) {
    this._status = status;
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
}
