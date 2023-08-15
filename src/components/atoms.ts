import { atom } from "jotai";

const accoladeFormAtom = atom(false)
const showDetailPage = atom(false)
const uFilter = atom("unassigned")
const searchCallback = atom("")

export { searchCallback }
export { accoladeFormAtom}
export { showDetailPage }
export { uFilter }