import { describe, it, expect } from 'vitest';
import PaginationHelper from './PaginationHelper';


describe("item count", () => {
  it("should return the number of items within the entire collection", () => {
    const helper = new PaginationHelper(['a', 'b', 'c', 'd', 'e', 'f'], 4);
    expect(helper.itemCount()).toBe(6);
  });

  it("Should return 0 if empty", () => {
    const helper = new PaginationHelper([], 4);
    expect(helper.itemCount()).toBe(0);
  })
})

describe("page count", () => {

  it("should return the number of pages", () => {
    const helper = new PaginationHelper(['a', 'b', 'c', 'd', 'e', 'f'], 4);
    expect(helper.pageCount()).toBe(2);
  });

  it("should return 0 if empty", () => {
    const helper = new PaginationHelper([], 4);
    expect(helper.pageCount()).toBe(0);
  })

  it("should return 1 if itemsPerPage is 0", () => {
    const helper = new PaginationHelper(['a', 'b', 'c', 'd', 'e', 'f'], 0);
    expect(helper.pageCount()).toBe(1);
  })

  it("should return 1 if itemsPerPage is negative", () => {
    const helper = new PaginationHelper(['a', 'b', 'c', 'd', 'e', 'f'], -4);
    expect(helper.pageCount()).toBe(1);
  })
});

describe("PageItemCount", () => {
  it("Should return -1 if the page is out of range", () => {
    const helper = new PaginationHelper(['a', 'b', 'c', 'd', 'e', 'f'], 4);
    expect(helper.pageItemCount(2)).toBe(-1);
    expect(helper.pageItemCount(-1)).toBe(-1);
  });

  it("Should return the number of items on the current page", () => {
    const helper = new PaginationHelper(['a', 'b', 'c', 'd', 'e', 'f'], 4);
    expect(helper.pageItemCount(1)).toBe(2);
  });

  it("Should return the number of items on the current page", () => {
    const helper = new PaginationHelper(['a', 'b', 'c', 'd', 'e', 'f'], 4);
    expect(helper.pageItemCount(0)).toBe(4);
  });

});

describe("pageIndex", () => {
  it("Should return the index of page for an item", () => {
    const helper = new PaginationHelper(['1', '2', '3', '4'], 2);

    expect(helper.pageIndex(0)).toEqual(0);
    expect(helper.pageIndex(1)).toEqual(0);
    expect(helper.pageIndex(2)).toEqual(1);
    expect(helper.pageIndex(3)).toEqual(1);
  });

  it("Should return -1 if the item is not found", () => {
    const helper = new PaginationHelper(['1', '2', '3', '4'], 2);

    expect(helper.pageIndex(83)).toEqual(-1);
  })

  it("Should return the correct number for 1 item per page", () => {
    const helper = new PaginationHelper(Array.from({ length: 95 }, (i) => i), 1);

    expect(helper.pageIndex(0)).toEqual(0);
    expect(helper.pageIndex(1)).toEqual(1);
    expect(helper.pageIndex(2)).toEqual(2);
    expect(helper.pageIndex(94)).toEqual(94);
    expect(helper.pageIndex(95)).toEqual(-1);
  })

  it("For itemCount = 8, itemsPerPage = 4, asking the 8 should return -1", () => {
    const helper = new PaginationHelper(Array.from({ length: 8 }, (i) => i), 4);

    expect(helper.pageIndex(8)).toEqual(-1);
  })

})

describe("CodeWars ", () => {
  it("sample test : 24 items with 10 per page", () => {
    const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    const helper = new PaginationHelper(collection, 10)


    expect(helper.pageCount()).toEqual(3);
    expect(helper.itemCount()).toEqual(24);

    expect(helper.pageItemCount(1)).toEqual(10);
    expect(helper.pageItemCount(2)).toEqual(4);
    expect(helper.pageItemCount(3)).toEqual(-1);
    expect(helper.pageIndex(40)).toEqual(-1);
    expect(helper.pageIndex(22)).toEqual(2);
    expect(helper.pageIndex(3)).toEqual(0);
    expect(helper.pageIndex(0)).toEqual(0);
    expect(helper.pageIndex(-1)).toEqual(-1);
    expect(helper.pageIndex(-23)).toEqual(-1);
    expect(helper.pageIndex(-15)).toEqual(-1);
  });

  it("Sample test empty collection", () => {
    const empty = new PaginationHelper([], 10);

    expect(empty.pageCount()).toEqual(0);
    expect(empty.itemCount()).toEqual(0);
    expect(empty.pageIndex(0)).toEqual(-1);
    expect(empty.pageItemCount(0)).toEqual(-1);
  });

})
