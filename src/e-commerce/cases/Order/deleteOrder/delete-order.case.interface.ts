export interface DeleteOrderCaseInterface {
  exec(id: string): Promise<void>;
}
