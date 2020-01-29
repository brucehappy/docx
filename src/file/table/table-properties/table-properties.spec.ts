import { expect } from "chai";

import { Formatter } from "export/formatter";

import { ShadingType } from "../shading";
import { WidthType } from "../table-cell";
import { TableLayoutType } from "./table-layout";
import { TableProperties } from "./table-properties";

describe("TableProperties", () => {
    describe("#constructor", () => {
        it("creates an initially empty property object", () => {
            const tp = new TableProperties();
            // The TableProperties is ignorable if there are no attributes,
            // which results in prepForXml returning undefined, which causes
            // the formatter to throw an error if that is the only object it
            // has been asked to format.
            expect(() => new Formatter().format(tp)).to.throw("XMLComponent did not format correctly");
        });
    });

    describe("#setWidth", () => {
        it("should add a table width property", () => {
            const tp = new TableProperties().setWidth(1234, WidthType.DXA);
            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "w:tblPr": [{ "w:tblW": { _attr: { "w:type": "dxa", "w:w": 1234 } } }],
            });
        });

        it("should add a table width property with default of AUTO", () => {
            const tp = new TableProperties().setWidth(1234);
            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "w:tblPr": [{ "w:tblW": { _attr: { "w:type": "auto", "w:w": 1234 } } }],
            });
        });
    });

    describe("#setLayout", () => {
        it("sets the table to fixed width layout", () => {
            const tp = new TableProperties();
            tp.setLayout(TableLayoutType.FIXED);
            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "w:tblPr": [{ "w:tblLayout": { _attr: { "w:type": "fixed" } } }],
            });
        });
    });

    describe("#cellMargin", () => {
        it("adds a table cell top margin", () => {
            const tp = new TableProperties();
            tp.CellMargin.addTopMargin(1234, WidthType.DXA);
            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "w:tblPr": [{ "w:tblCellMar": [{ "w:top": { _attr: { "w:type": "dxa", "w:w": 1234 } } }] }],
            });
        });

        it("adds a table cell left margin", () => {
            const tp = new TableProperties();
            tp.CellMargin.addLeftMargin(1234, WidthType.DXA);
            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "w:tblPr": [{ "w:tblCellMar": [{ "w:left": { _attr: { "w:type": "dxa", "w:w": 1234 } } }] }],
            });
        });
    });

    describe("#setShading", () => {
        it("sets the shading of the table", () => {
            const tp = new TableProperties();
            tp.setShading({
                fill: "b79c2f",
                val: ShadingType.REVERSE_DIAGONAL_STRIPE,
                color: "auto",
            });
            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "w:tblPr": [
                    {
                        "w:shd": {
                            _attr: {
                                "w:color": "auto",
                                "w:fill": "b79c2f",
                                "w:val": "reverseDiagStripe",
                            },
                        },
                    },
                ],
            });
        });
    });
});
