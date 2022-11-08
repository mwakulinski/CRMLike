import { expect } from "chai";
import { describe } from "mocha";
import { Validator } from "../src/validator/validator";

describe("Validator", () => {
  describe("isTransformableToNumber", () => {
    it("should return true when given input is a numerical string", () => {
      expect(Validator.isTransformableToNumber("1.5")).to.equal(true);
    });

    it("should return true when given input is a number", () => {
      expect(Validator.isTransformableToNumber(1)).to.equal(true);
    });

    it("should return false when given input is not a numerical string", () => {
      expect(Validator.isTransformableToNumber("Some string")).to.equal(false);
    });

    it("should return false when given input is an object", () => {
      expect(Validator.isTransformableToNumber({})).to.equal(false);
    });
  });

  describe("isTransformableToInteger", () => {
    it("should return true when given input is an integer string", () => {
      expect(Validator.isTransformableToInteger("-1")).to.equal(true);
    });

    it("should return false when given input is not an integer string", () => {
      expect(Validator.isTransformableToInteger("-1.5")).to.equal(false);
    });
  });

  describe("isInGivenRange", () => {
    it("should return true when given input is a number in given range between 1 and 10", () => {
      expect(Validator.isInGivenRange(1, { min: 1, max: 10 })).to.equal(true);
      expect(Validator.isInGivenRange(10, { min: 1, max: 10 })).to.equal(true);
    });

    it("should return true when given input is a numerical string in given range between 1 and 10", () => {
      expect(Validator.isInGivenRange("8.34", { min: 1, max: 10 })).to.equal(
        true
      );
      expect(Validator.isInGivenRange("1.23", { min: 1, max: 10 })).to.equal(
        true
      );
    });

    it("should return false when given input is a numerical string or number not in given range between 1 and 10", () => {
      expect(Validator.isInGivenRange("18.34", { min: 1, max: 10 })).to.equal(
        false
      );
      expect(Validator.isInGivenRange(-1.23, { min: 1, max: 10 })).to.equal(
        false
      );
    });
  });
});
