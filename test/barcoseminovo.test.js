import {expect, test} from "vitest";
import barcoSeminovo from "./mocks/barco_seminovo";

test("Should get full seminovo object with data from database", () => {
    expect(barcoSeminovo).toBe(barcoSeminovo)
})