export enum ActivityType {
  GoodsIssueConfirmOrder = 'GOODS_ISSUE_CONFIRM_ORDER',
  GoodsIssueNewProduct = 'GOODS_ISSUE_NEW_PRODUCT',
  GoodsIssueConfirmSerial = 'GOODS_ISSUE_CONFIRM_SERIAL',
  GoodsIssueNewOrder = 'GOODS_ISSUE_NEW_ORDER',
  GoodsIssueRemoveProduct = 'GOODS_ISSUE_REMOVE_PRODUCT',
  GoodsIssueCancelOrder = 'GOODS_ISSUE_CANCEL_ORDER',
  GoodsIssueUpdateOrderInfo = 'GOODS_ISSUE_UPDATE_ORDER_INFO',
  GoodsIssueMakeCompleteOrder = 'GOODS_ISSUE_MAKE_COMPLETE_ORDER',

  //Goods receipt

  GoodsReceiptMewOrder = 'GOODS_RECEIPT_NEW_ORDER',
  GoodsReceiptUpdateOrderInfo = 'GOODS_RECEIPT_UPDATE_ORDER_INFO',
  GoodsReceiptConfirmOrder = 'GOODS_RECEIPT_CONFIRM_ORDER',
  GoodsReceiptReceivePackage = 'GOODS_RECEIPT_RECEIVE_PACKAGE',
  GoodsReceiptReleasePackage = 'GOODS_RECEIPT_RELEASE_PACKAGE',
  GoodsReceiptCompletedOrder = 'GOODS_RECEIPT_COMPLETED_ORDER',
  GoodsReceiptUpdateProduct = 'GOODS_RECEIPT_UPDATE_PRODUCT',
  GoodsReceiptRemoveProduct = 'GOODS_RECEIPT_REMOVE_PRODUCT',
  GoodsReceiptNewProduct = 'GOODS_RECEIPT_NEW_PRODUCT',
  GoodsReceiptCancelOrder = 'GOODS_RECEIPT_CANCEL_ORDER',
}
