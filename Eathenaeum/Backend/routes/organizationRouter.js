import express from 'express'
import { createOrgMidd, removeOrgMemberMidd, updateOrgMidd } from '../meddleware/organizationAuth.js'
import { createOrg, getAllOrgDetails, orgVerification, addOrRemoveMemberOrg, updateOrg } from '../controller/organizationCon.js'
import { queryTokenMiddl, tokenMiddl } from '../meddleware/tokenAuth.js'


const orgRouter = express.Router()


orgRouter.post('/create', createOrgMidd, createOrg)
orgRouter.post('/update', updateOrgMidd, updateOrg)
orgRouter.post('/member/add-remove', removeOrgMemberMidd, addOrRemoveMemberOrg)

orgRouter.post("/all-orgs", queryTokenMiddl, getAllOrgDetails);
orgRouter.post('/account-verify', tokenMiddl, orgVerification)


export default orgRouter;