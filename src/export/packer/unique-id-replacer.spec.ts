/* tslint:disable:typedef space-before-function-paren */
import { expect } from "chai";

import { UniqueIdReplacer } from "./unique-id-replacer";

describe("UniqueIdReplacer", () => {
    let uniqueIdReplacer: UniqueIdReplacer;

    beforeEach(() => {
        uniqueIdReplacer = new UniqueIdReplacer();
    });

    describe("#replace()", () => {
        it("should properly replace all ids", () => {
            const replaced = uniqueIdReplacer.replace('<a id="uId{ab}"/> <b id="uId{ab}"/> <c id="uId{c}"/>');
            expect(replaced).to.equal('<a id="0"/> <b id="1"/> <c id="0"/>');
        });
    });
});
