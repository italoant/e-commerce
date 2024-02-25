export interface RepositoryInterface<T> {
  findById(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  create(data: T, id?: string): Promise<T>;
  delete(id: string): Promise<void>;
  update(data: T): Promise<T>;
}
