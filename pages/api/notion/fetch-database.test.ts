import * as fetch_database from "./fetch-database"
// @ponicode
describe("fetch_database.default", () => {
    test("0", async () => {
        let result: any = await fetch_database.default()
        expect(result).toBe(undefined)
    })
})
