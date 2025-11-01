import adminUserModel from "../models/adminUserModel.js"; 
import OrgModel from "../models/organizationModel.js";
import bcrypt from 'bcryptjs'
import 'dotenv'

const checkAdminUser = async (email, password, mess) => {

    const user = await adminUserModel.findOne({ email: email })
    if (!user)
        return ({ valid: false, message: `${mess} account doesn't exits` })

    const UserPassMatch = await bcrypt.compare(password, user.password)
    if (!UserPassMatch)
        return ({ valid: false, message: `${mess} Password Incorrect` })

    return ({ valid: true, user });
}

const insertOrgInAdUser = async (id, org) => {
    await adminUserModel.findByIdAndUpdate(id, { organization: org._id });
}


// Create Organization 
const createOrg = async (req, res) => {
    const {
        userId, org_orgName, org_m1LEmail, org_m2Email, org_m3Email,
        org_m4Email, org_m5Email, org_m1LPassword, org_m2Password,
        org_m3Password, org_m4Password, org_m5Password, org_termCondition
    } = req.body;

    const userList = [];
    const members = [
        { email: org_m1LEmail, password: org_m1LPassword, role: "Leader" },
        { email: org_m2Email, password: org_m2Password, role: "member 2" },
        { email: org_m3Email, password: org_m3Password, role: "member 3" },
        { email: org_m4Email, password: org_m4Password, role: "member 4" },
        { email: org_m5Email, password: org_m5Password, role: "member 5" }
    ];

    try {
        const user = await adminUserModel.findById(userId);
        if (!user)
            return res.json({ success: false, message: "User does not exist" });

        for (const member of members) {
            if (member.email && member.password) {
                const result = await checkAdminUser(member.email, member.password, member.role);
                if (!result.valid) throw result.message;
                if (result.user.organization)
                    return ({ valid: false, message: `${member.role} already part of Organization` })
                userList.push(result.user._id);
            }
        }

        const newOrg = new OrgModel({
            organization: org_orgName,
            createBy: userList[0], // Leader is always the first in the list
            members: userList,
            termCondition: org_termCondition
        });

        const organization = await newOrg.save();
        if (!organization)
            return res.json({ success: false, message: "Organization not created" });

        // Update each user's organization information
        await Promise.all(userList.map(Id => insertOrgInAdUser(Id, organization)));

        res.json({ success: true, organization });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};


// Update Organizatioin 
const updateOrg = async (req, res) => {
    const {
        userId, org_OrgName, org_LeaderEmail, org_LeaderPass,
        org_NLeaderEmail, org_NLeaderPass, org_BankName,
        org_Account, org_IFSCCode
    } = req.body;

    const data = {};

    try {
        // Fetch the user
        const user = await adminUserModel.findById(userId);
        if (!user)
            return res.json({ success: false, message: "User not exist" })

        if (!user.organization)
            return res.json({ success: false, message: "Please first create organization then edit" })

        const organ = await OrgModel.findById(user.organization)
        if (!organ)
            return res.json({ success: false, message: "Organization not exist" })

        if (!(organ.createBy.toString() === user._id.toString()))
            return res.json({ success: false, message: "your not a Leader" })

        // Organization Name Change
        if (org_OrgName) data['organization'] = org_OrgName;

        // Bank Details add & Change
        const bankDetails = { bankName: org_BankName, bankAccount: org_Account, IFSCCode: org_IFSCCode };
        Object.keys(bankDetails).forEach(key => {
            if (bankDetails[key])
                data[key] = bankDetails[key];
        });

        // Leader Change
        if (org_LeaderEmail && org_LeaderPass && org_NLeaderEmail && org_NLeaderPass) {
            const userLeader = await checkAdminUser(org_LeaderEmail, org_LeaderPass, "Leader");
            if (!userLeader.valid) throw userLeader.message;

            const newUserLeader = await checkAdminUser(org_NLeaderEmail, org_NLeaderPass, "New leader");
            if (!newUserLeader.valid) throw newUserLeader.message;

            if (!(userLeader.user.organization.toString() == newUserLeader.user.organization.toString()))
                return res.json({ success: false, message: "New member not belong Organization" })

            const organization = await OrgModel.findById(userLeader.user.organization);
            if (!organization)
                return res.json({ success: false, message: "Organization not exist" })

            if (organization.createBy.toString() === userLeader.user._id.toString()) {
                data['createBy'] = newUserLeader.user._id;
            } else {
                return res.json({ success: false, message: "Only leader update data" })
            }
        }

        // Update organization details
        const org = await OrgModel.findByIdAndUpdate(organ._id, data, { new: true });
        if (!org)
            return res.json({ success: false, message: "Doesn't change" })
        res.json({ success: true, data: 'Update Successfully' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


const addOrRemoveMemberOrg = async (req, res) => {
    const { userId, reEmail, rePassword, reOption } = req.body;
    const userList = [];
    var mess;
    var newMemberList = '';
    try {
        const user = await adminUserModel.findById(userId)
        if (!user)
            return res.json({ success: false, message: "User not exist" })

        if (user.email === reEmail)
            return res.json({ success: false, message: "Error" })

        if (!user.organization)
            return res.json({ success: false, message: "You are not part of the organization" })


        const member = await checkAdminUser(reEmail, rePassword, "Member")
        if (!member.valid)
            throw member.message
        const organization = await OrgModel.findById(user.organization)
        if (!organization)
            return res.json({ success: false, message: "Organization not exist" })
        if (organization.createBy.toString() === member.user._id.toString())
            throw "Error"
        if (!(organization.createBy.toString() === user._id.toString()))
            return res.json({ success: false, message: "Only the leader can remove or add a member" })

        // Add member in the Organization
        if (reOption === 'add') {
            if (organization.members.length === 5)
                return res.json({ success: false, message: "An organization can have a maximum of 5 members" })

            if (organization.members.some(id => id.toString() === member.user._id.toString()))
                return res.json({ success: false, message: "Member already present in organization" })

            organization.members.forEach((Id) => {
                userList.push(Id)
            })
            userList.push(member.user._id)

            await adminUserModel.findByIdAndUpdate(member.user._id, { organization: organization._id })
            mess = "Member Add Successfully"

            const org = await OrgModel.findByIdAndUpdate(organization._id, { members: userList })
            if (!org)
                return res.json({ success: false, message: "Doesn't change" })

            return res.json({ success: true, message: mess })
        }
        else if (reOption === 'remove') {  // Remove member in the Organization

            // Filter out the member to be removed from the members list
            newMemberList = organization.members.filter(
                (id) => id.toString() !== member.user._id.toString()
            );

            // If the new list is the same as the original, the member wasn't found
            if (newMemberList.length === organization.members.length)
                return res.json({ success: false, message: "remove user not present in Organization" })

            // Remove the organization from the member's record
            await adminUserModel.findByIdAndUpdate(member.user._id, { $unset: { organization: "" } });
            mess = "Member Removed Successfully"

            const org = await OrgModel.findByIdAndUpdate(organization._id, { members: newMemberList })
            if (!org)
                return res.json({ success: false, message: "Doesn't change" })
            return res.json({ success: true, message: mess })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}


const getAllOrgDetails = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await adminUserModel.findById(userId)
        if (!user)
            return res.json({ success: false, message: "You are not Authorized" })

        if (!(user.role === process.env.SECRET_Id))
            throw "Error"

        const orgs = await OrgModel.find({})
        res.json({ success: true, data: orgs })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })

    }
}


// verify Organization
const orgVerification = async (req, res) => {
    const { userId, id } = req.body;
    try {
        const user = await adminUserModel.findById(userId)
        if (!user)
            return res.json({ success: false, message: "You are not Authorized" })

        if (!(user.role === process.env.SECRET_Id))
            throw "Error"

        const org = await OrgModel.findById(id)
        if (!org)
            return res.json({ success: false, message: "Organization not exist" })

        if (org.verify) {
            await OrgModel.findByIdAndUpdate(id, { verify: false })
            return res.json({ success: true, message: "Organization verify : false" })
        }
        else {
            await OrgModel.findByIdAndUpdate(id, { verify: true })
            return res.json({ success: true, message: "Organization verify : true" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }
}





export { createOrg, updateOrg, addOrRemoveMemberOrg, getAllOrgDetails, orgVerification };