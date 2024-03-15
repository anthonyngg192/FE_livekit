export class PagingModel<T> {
  public data: T[] = [];
  public page = 1;
  public limit = 20;
  public total = 0;
  public pages?: number;

  constructor(paging = null) {
    for (const key in paging) {
      if (paging.hasOwnProperty(key)) {
        this[key] = paging[key];
      }
    }
  }
  public selection = [20, 40, 60];
}
