import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../prisma/client"


export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    if (req.method === "POST") {
        
            try {
                
                const response = await prisma.accoladeBackup.findUnique({
                where: {
                    id: req.body.undoId
                }})

                const {id, name, institution, outcome, extSource, intSource, messaging, frequency, notifDate, 
                cmcontact, sourceatr, wherepubint, promotionlim,comments, imgurl1, imgurl2,imgurl3,imgurl4} = response

                
                await prisma.accolade.create({
                    data: {
                        institution, name, comments, outcome, extSource,
                        intSource, messaging, frequency, notifDate, cmcontact,
                        sourceatr, wherepubint, promotionlim, imgurl1, imgurl2,
                        imgurl3, imgurl4
                }})

                await prisma.accoladeBackup.delete({
                    where: {
                        id: id
                }})
                res.status(200).json({message: 'delete successful'})

            } catch {
                res.status(500).json({message: 'error in findUnique'})        
            }

    }}
