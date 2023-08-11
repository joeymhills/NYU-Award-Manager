import { utapi } from "uploadthing/server"

export default async function getImg(key:string) {

    try{
    const url = await utapi.getFileUrls(key)
    }
    catch{
        console.log('error in api/getImg')
    }

}
