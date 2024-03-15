import { EquipmentModel } from 'src/app/pages/warehouse/models/equipment.model';
import { GoodsReceiptOrderModel } from 'src/app/pages/goods-receipt-order/models/goods-receipt-order.model';

export class GoodsReceiptOrderDetail extends GoodsReceiptOrderModel {
  gates: EquipmentModel[];
  gate: EquipmentModel;
  zones: EquipmentModel[];
}
