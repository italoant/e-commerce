import { OrderItemRequest } from "../../../../infrastructure/controllers/dto/order-item.request.dto";

export interface DeleteOrderItemCaseInterface {
  exec(data: OrderItemRequest): Promise<void>;
}
