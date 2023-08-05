import { atom } from "jotai";

const accoladeFormAtom = atom(false)
const showDetailPage = atom(false)
const hospitalFilterAtom = atom("Wide")
const showCardAtom = atom(true)
const showTableAtom = atom(false)

export{ showCardAtom }
export { showTableAtom }
export { accoladeFormAtom}
export { showDetailPage }
export { hospitalFilterAtom }