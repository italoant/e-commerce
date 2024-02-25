export interface DeleteOrderItemCaseInterface {
  exec(id: string): Promise<void>;
}
