export class PaginationHelper {
  collection = [];
  itemsPerPage = 0;

  constructor(collection, itemsPerPage) {
    this.collection = collection;
    this.itemsPerPage = itemsPerPage;
  }

  itemCount() {
    // returns the number of items within the entire collection
    return this.collection.length;
  }

  pageCount() {
    // returns the number of pages
    const itemCount = this.itemCount();

    if (itemCount === 0) return 0;
    if (this.itemsPerPage <= 0) return 1;

    return Math.ceil(itemCount / this.itemsPerPage)
  }

  pageItemCount(pageIndex) {
    // returns the number of items on the current page. page_index is zero based.
    // this method should return -1 for pageIndex values that are out of range

    const pageCount = this.pageCount() - 1;
    if (pageCount < pageIndex || pageIndex < 0) return -1;

    const pageStart = this.itemsPerPage * pageIndex
    const page = this.collection.slice(pageStart, pageStart + this.itemsPerPage);

    return page.length;
  }

  pageIndex(itemIndex) {
    // determines what page an item is on. Zero based indexes
    // this method should return -1 for itemIndex values that are out of range
    if (this.itemCount() === 0) return -1;
    if (itemIndex >= this.itemCount() || itemIndex < 0) return -1;

    return Math.floor(itemIndex / this.itemsPerPage);
  }
}

export default PaginationHelper;
