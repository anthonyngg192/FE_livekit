import PackageModel from 'src/app/pages/goods-receipt-order/models/package.model';
import { BaseModel } from 'src/app/models/base/base.model';
import { PackageActivity } from 'src/app/pages/product/constants/package-activity';
import { SupplierModel } from 'src/app/pages/client-partner/models/supplier.model';

export class CurrentPackageStateModel extends BaseModel {
  warehouseId: string;
  packageId: string;
  productId: string;
  serial: string;
  preStateId?: string;
  preBinCode?: string;
  activity: PackageActivity;
  movedBy?: string;
  binCode?: string;
  package: PackageModel;
  supplier: SupplierModel;
}
