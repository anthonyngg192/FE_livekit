import { Component, Input } from '@angular/core';
import { PermissionAppEnum } from 'src/app/consts/permission-app.const';
import { PermissionEnum } from 'src/app/consts/permission.const';
import { PermissionModel } from 'src/app/models/iam/permission.model';
import { SessionService } from 'src/app/modules/service/session.service';

interface MenuItem {
  app?: PermissionAppEnum;
  feature?: string;
  name?: string;
  icon?: string;
  link?: string;
  permission?: PermissionEnum;
  children?: MenuItem[];
}

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent {
  @Input() isCollapsed = false;

  //reportTitle
  menuData: MenuItem[] = [
    {
      icon: '/assets/icons/seo-report.png',
      name: 'reportTitle',
      children: [
        {
          app: PermissionAppEnum.WAREHOUSE,
          feature: 'Report',
          name: 'overView',
          link: '/report/over-view',
        },
        {
          app: PermissionAppEnum.WAREHOUSE,
          feature: 'Report',
          name: 'revenue',
          link: '/report/revenue',
        },
        {
          app: PermissionAppEnum.WAREHOUSE,
          feature: 'Report',
          name: 'storageManagement',
          link: '/storage/package',
        },
      ],
    },
    {
      icon: '/assets/icons/goods-receipt.png',
      name: 'storageInput',
      children: [
        {
          app: PermissionAppEnum.WAREHOUSE,
          feature: 'GoodsReceiptOrder',
          link: '/goods-receipt-order/goods-receipt-orders',
          name: 'grOrderList',
        },
        {
          app: PermissionAppEnum.WAREHOUSE,
          feature: 'GoodsReceiptOrder',
          link: '/goods-receipt-order/new-goods-receipt-order',
          name: 'newGoodsReceiptOrder',
        },
      ],
    },
    {
      icon: '/assets/icons/goods-issue.png',
      name: 'storageOutput',
      children: [
        {
          app: PermissionAppEnum.GOODS_ISSUE_ORDER,
          feature: 'GoodsIssueOrder',
          link: '/goods-issue-order/goods-issue-orders',
          name: 'giOrderList',
        },
        {
          app: PermissionAppEnum.GOODS_ISSUE_ORDER,
          feature: 'GoodsIssueOrder',
          link: '/goods-issue-order/new-goods-issue-order',
          name: 'createGoodsIssueOrder',
        },
      ],
    },
    {
      icon: '/assets/icons/internal-transfer.png',
      name: 'internalTransferTitle',
      children: [
        {
          app: PermissionAppEnum.InternalTransfer,
          feature: 'InternalTransfer',
          link: '/internal-transfer/manager',
          name: 'internalTransferList',
        },
        {
          app: PermissionAppEnum.InternalTransfer,
          feature: 'GoodsIssueOrder',
          link: '/internal-transfer/new',
          name: 'newInternalTransfer',
        },
      ],
    },
    {
      icon: '/assets/icons/packaging.png',
      name: 'servicePack',
      children: [
        {
          app: PermissionAppEnum.GOODS_ISSUE_ORDER,
          feature: 'Brand',
          name: 'list',
          link: '/service/attach-services',
        },
      ],
    },
    {
      icon: '/assets/icons/product.png',
      name: 'product',
      children: [
        {
          app: PermissionAppEnum.WAREHOUSE,
          feature: 'Brand',
          name: 'brandingManage',
          link: '/product/branding',
        },
        {
          app: PermissionAppEnum.WAREHOUSE,
          feature: 'Product',
          name: 'product',
          link: '/product/product',
        },
        {
          app: PermissionAppEnum.WAREHOUSE,
          feature: 'ProductCategory',
          name: 'productCategory',
          link: '/product/product-category',
        },
      ],
    },
    {
      icon: '/assets/icons/client.png',
      name: 'client',
      children: [
        {
          app: PermissionAppEnum.IAM,
          feature: 'Supplier',
          name: 'client',
          link: '/client/suppliers',
        },
        {
          app: PermissionAppEnum.IAM,
          feature: 'Supplier',
          name: 'logType-createSupplier',
          link: '/client/supplier/add-new',
        },
      ],
    },
    {
      icon: '/assets/icons/finance.png',
      name: 'finance',
      children: [
        {
          app: PermissionAppEnum.IAM,
          feature: 'Supplier',
          name: 'overView',
          link: 'overView',
        },
        {
          app: PermissionAppEnum.IAM,
          feature: 'Supplier',
          name: 'debtManage',
          link: 'debtManage',
        },
      ],
    },
    {
      icon: '/assets/icons/employee.png',
      name: 'staff',
      children: [
        {
          app: PermissionAppEnum.IAM,
          feature: 'Account',
          link: '/account/account',
          name: 'staffList',
        },
        {
          app: PermissionAppEnum.IAM,
          feature: 'AccountGroup',
          link: '/account/account-group',
          name: 'staffGroup',
        },
      ],
    },
    {
      icon: '/assets/icons/warehouse.png',
      name: 'warehouse',
      children: [
        {
          app: PermissionAppEnum.WAREHOUSE,
          feature: 'Warehouse',
          link: '/warehouse/warehouses',
          name: 'warehouses',
        },
        {
          app: PermissionAppEnum.WAREHOUSE,
          feature: 'Equipment',
          link: '/warehouse/areas',
          name: 'area',
        },
        {
          app: PermissionAppEnum.WAREHOUSE,
          feature: 'Equipment',
          link: '/warehouse/gates/gateIn',
          name: 'gateIn',
        },
        {
          app: PermissionAppEnum.WAREHOUSE,
          feature: 'Equipment',
          link: '/warehouse/zones-gate/zoneIn',
          name: 'zoneIn',
        },
        {
          app: PermissionAppEnum.WAREHOUSE,
          feature: 'Equipment',
          link: '/warehouse/gates/gateOut',
          name: 'gateOut',
        },

        {
          app: PermissionAppEnum.WAREHOUSE,
          feature: 'Equipment',
          link: '/warehouse/zones-gate/zoneOut',
          name: 'zoneOut',
        },
        {
          app: PermissionAppEnum.WAREHOUSE,
          feature: 'Equipment',
          link: '/warehouse/blocks',
          name: 'binList',
        },
        {
          app: PermissionAppEnum.WAREHOUSE,
          feature: 'Equipment',
          link: '/warehouse/vehicles',
          name: 'vehicle',
        },
        {
          app: PermissionAppEnum.WAREHOUSE,
          feature: 'Equipment',
          link: '/warehouse/services',
          name: 'serviceTitle',
        },
      ],
    },
    {
      icon: '/assets/icons/setting.png',
      name: 'settings',
      children: [
        {
          app: PermissionAppEnum.IAM,
          feature: 'Account',
          link: '/permission',
          name: 'permissions',
        }, //
        {
          app: PermissionAppEnum.WAREHOUSE,
          feature: 'Unit',
          link: '/setting/unit',
          name: 'unit',
        },
        {
          app: PermissionAppEnum.IAM,
          feature: 'Account',
          link: '/payment',
          name: 'paymentMethod',
        },
        {
          app: PermissionAppEnum.IAM,
          feature: 'Account',
          link: '/setting/area',
          name: 'area',
        },
        {
          app: PermissionAppEnum.IAM,
          feature: 'Account',
          link: '/cost',
          name: 'cost',
        },
        {
          app: PermissionAppEnum.IAM,
          feature: 'Account',
          link: '/webhook',
          name: 'Webhooks',
        },
        {
          app: PermissionAppEnum.IAM,
          feature: 'Bank',
          link: '/finance/bank',
          name: 'bank',
        },
      ],
    },
  ];

  menus: MenuItem[] = [];

  constructor(private readonly sessionService: SessionService) {
    this.sessionService.permissions$.subscribe((permissions) => {
      this.updateMenu(permissions || []);
    });
  }

  private updateMenu(permissions: PermissionModel[]) {
    this.menus = this.menuData
      .map((menu) => {
        menu.children = menu.children.filter((item) => {
          const permission = permissions.find(
            (perm) =>
              perm.app?.toLowerCase() === item.app?.toLowerCase() &&
              perm.feature?.toLowerCase() === item.feature?.toLowerCase(),
          );

          return permission ? permission.permissions.includes(item.permission || PermissionEnum.SHOW) : true;
        });
        return menu;
      })
      .filter((menu) => menu.children.length);
  }
}
