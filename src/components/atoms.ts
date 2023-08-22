import { atom } from "jotai";

const accoladeFormAtom = atom(false)
const showDetailPage = atom(false)
const uFilter = atom("unassigned")
const searchCallback = atom("")
const aFilter = atom("")
const editChannel = atom("")
const locationFilter = atom ("")
const searchLocationFilter = atom("")

export { searchLocationFilter }
export { locationFilter }
export { editChannel }
export { aFilter }
export { searchCallback }
export { accoladeFormAtom}
export { showDetailPage }
export { uFilter }
