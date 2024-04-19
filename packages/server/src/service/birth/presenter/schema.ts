import { NewOrder, UpdateOrderStatus } from "../../../lib/validator.js";

const validator = {
  "POST:/": NewOrder,
  "PUT:/": UpdateOrderStatus
};

export default validator;
