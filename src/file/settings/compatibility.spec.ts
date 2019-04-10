import { expect } from "chai";
import { Formatter } from "export/formatter";
import { Compatibility } from "file/settings/compatibility";

describe("Compatibility", () => {
    describe("#constructor", () => {
        it("creates an initially empty property object", () => {
            const compatibility = new Compatibility();

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "w:compat": {} });
        });
    });

    describe("#doNotExpandShiftReturn", () => {
        it("should create a setting for not justifying lines ending in soft line break", () => {
            const compatibility = new Compatibility();
            compatibility.doNotExpandShiftReturn();

            const tree = new Formatter().format(compatibility);
            expect(tree).to.deep.equal({ "w:compat": [{ "w:doNotExpandShiftReturn": {} }] });
        });
    });
});
