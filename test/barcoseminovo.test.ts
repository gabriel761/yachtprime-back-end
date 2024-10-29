import {expect, test} from "vitest";
import barcoSeminovo from "./mocks/barco_seminovo.ts";

test("Should get full seminovo object with data from database", () => {
    expect(barcoSeminovo).toEqual(barcoSeminovo)
})