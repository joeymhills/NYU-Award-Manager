import { atom } from "jotai";

const accoladeFormAtom = atom(false)
const showDetailPage = atom(false)
const uFilter = atom("unassigned")
const searchCallback = atom("")
const aFilter = atom("")
const editService = atom("")
const locationFilter = atom ("")
const searchLocationFilter = atom("")
const searchServiceFilter = atom("")
const editLocation = atom("")

export { editLocation }
export { searchServiceFilter }
export { searchLocationFilter }
export { locationFilter }
export { editService }
export { aFilter }
export { searchCallback }
export { accoladeFormAtom}
export { showDetailPage }
export { uFilter }
