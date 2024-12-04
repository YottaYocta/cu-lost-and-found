import assert from "node:assert";
import { chainFilter } from "../util";
import { describe, it } from "node:test";
import expect from "node:test";

describe("chainFilter", () => {
  it("should remove numbers that are even or multiples of five", () => {
    let filters = [
      (num: number) => num % 2 != 0,
      (num: number) => num % 5 != 0,
    ];

    let arrSource = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let expected = [1, 3, 7, 9];
    assert.deepEqual(expected, chainFilter(arrSource, filters));
  });
});
