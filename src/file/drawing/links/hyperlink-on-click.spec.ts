import { assert } from "chai";

import { Utility } from "tests/utility";

import { HyperlinkOnClick } from "./hyperlink-on-click";

describe("HyperlinkOnClick", () => {
    let hyperlinkOnClick: HyperlinkOnClick;

    beforeEach(() => {
        hyperlinkOnClick = new HyperlinkOnClick("superid");
    });

    describe("#constructor()", () => {
        it("should create a hyperlinkOnClick with correct root key", () => {
            const newJson = Utility.jsonify(hyperlinkOnClick);
            assert.equal(newJson.rootKey, "a:hlinkClick");
        });

        it("should create a hyperlinkOnClick with right attributes", () => {
            const newJson = Utility.jsonify(hyperlinkOnClick);
            const attributes = {
                id: "rIdsuperid",
                xmlns: "http://schemas.openxmlformats.org/drawingml/2006/main",
            };
            assert.equal(JSON.stringify(newJson.root[0].root), JSON.stringify(attributes));
        });
    });
});
