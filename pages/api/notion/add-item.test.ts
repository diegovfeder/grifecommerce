import rewire from "rewire"
const notion = rewire("./notion")
const addItem = notion.__get__("addItem")
// @ponicode
describe("addItem", () => {
    test("0", async () => {
        await addItem("Foo bar")
    })

    test("1", async () => {
        await addItem("This is a Text")
    })

    test("2", async () => {
        await addItem("Yurts in Big Sur, California")
    })

    test("3", async () => {
        await addItem("foo bar")
    })

    test("4", async () => {
        await addItem("")
    })
})
