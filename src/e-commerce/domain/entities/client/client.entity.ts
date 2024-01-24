import Entity from 'src/common/entity/entity';

export class Client extends Entity {
  _external_user_id: string;
  _full_name: string;
  _contact: number;
  _address: string;
  _isActive: boolean;
  _creation_date: Date;
  _update_date: Date;

  constructor(
    id: string,
    external_user_id: string,
    full_name: string,
    contact: number,
    address: string,
    isActive: boolean,
    creation_date: Date,
    update_date: Date,
  ) {
    super(id);

    this._external_user_id = external_user_id;
    this._full_name = full_name;
    this._contact = contact;
    this._address = address;
    this._isActive = isActive;
    this._creation_date = creation_date;
    this._update_date = update_date;
  }

  get external_user_id(): string {
    return this._external_user_id;
  }

  private set external_user_id(external_user_id: string) {
    this._external_user_id = external_user_id;
  }

  get full_name(): string {
    return this._full_name;
  }

  private set full_name(full_name: string) {
    this._full_name = full_name;
  }

  get contact(): number {
    return this._contact;
  }

  private set contact(contact: number) {
    this._contact = contact;
  }

  get address(): string {
    return this._address;
  }

  private set address(address: string) {
    this._address = address;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  private set isActive(isActive: boolean) {
    this._isActive = isActive;
  }

  get creation_date(): Date {
    return this._creation_date;
  }

  private set creation_date(creation_date: Date) {
    this._creation_date = creation_date;
  }

  get update_date(): Date {
    return this._update_date;
  }

  private set update_date(update_date: Date) {
    this._update_date = update_date;
  }
}
