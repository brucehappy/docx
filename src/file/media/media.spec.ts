// tslint:disable:object-literal-key-quotes
import { expect } from "chai";

import { Formatter } from "export/formatter";

import { File } from "../file";
import { Paragraph } from "../paragraph";
import { Media } from "./media";

describe("Media", () => {
    describe("#addImage", () => {
        it("should add image", () => {
            const file = new File();
            const image = Media.addImage(file, "");

            let tree = new Formatter().format(new Paragraph(image));
            expect(tree["w:p"]).to.be.an.instanceof(Array);

            tree = new Formatter().format(image);
            expect(tree["w:r"]).to.be.an.instanceof(Array);
        });

        it("should ensure the correct relationship id is used when adding image", () => {
            const file = new File();
            const image1 = Media.addImage(file, "test");
            const tree = new Formatter().format(new Paragraph(image1));
            const inlineElements = tree["w:p"][0]["w:r"][0]["w:drawing"][0]["wp:inline"];
            const graphicData = inlineElements.find((x) => x["a:graphic"]);

            expect(graphicData["a:graphic"][1]["a:graphicData"][1]["pic:pic"][2]["pic:blipFill"][0]["a:blip"]).to.deep.equal({
                _attr: {
                    "r:embed": `rId{image1.png}`,
                    cstate: "none",
                },
            });

            const image2 = Media.addImage(file, "test");
            const tree2 = new Formatter().format(new Paragraph(image2));
            const inlineElements2 = tree2["w:p"][0]["w:r"][0]["w:drawing"][0]["wp:inline"];
            const graphicData2 = inlineElements2.find((x) => x["a:graphic"]);

            expect(graphicData2["a:graphic"][1]["a:graphicData"][1]["pic:pic"][2]["pic:blipFill"][0]["a:blip"]).to.deep.equal({
                _attr: {
                    "r:embed": `rId{image2.png}`,
                    cstate: "none",
                },
            });
        });
    });

    describe("#addMedia", () => {
        it("should add media", () => {
            const image = new Media().addMedia("");
            expect(image.fileName).to.equal("image1.png");
            expect(image.dimensions).to.deep.equal({
                pixels: {
                    x: 100,
                    y: 100,
                },
                emus: {
                    x: 952500,
                    y: 952500,
                },
            });
        });

        it("should return UInt8Array if atob is present", () => {
            // tslint:disable-next-line
            ((process as any).atob as any) = () => "atob result";

            const image = new Media().addMedia("");
            expect(image.stream).to.be.an.instanceof(Uint8Array);
        });
    });

    describe("#getMedia", () => {
        it("should get media", () => {
            const media = new Media();
            media.addMedia("");

            const image = media.getMedia("image1.png");

            expect(image.fileName).to.equal("image1.png");
            expect(image.dimensions).to.deep.equal({
                pixels: {
                    x: 100,
                    y: 100,
                },
                emus: {
                    x: 952500,
                    y: 952500,
                },
            });
        });

        it("Get media", () => {
            const media = new Media();

            expect(() => media.getMedia("image1.png")).to.throw();
        });
    });

    describe("#Array", () => {
        it("Get images as array", () => {
            const media = new Media();
            media.addMedia("");

            const array = media.Array;
            expect(array).to.be.an.instanceof(Array);
            expect(array.length).to.equal(1);

            const image = array[0];
            expect(image.fileName).to.equal("image1.png");
            expect(image.dimensions).to.deep.equal({
                pixels: {
                    x: 100,
                    y: 100,
                },
                emus: {
                    x: 952500,
                    y: 952500,
                },
            });
        });
    });
});
