import { useContext } from 'react'
import './termAndCondition.css'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/storecontextfile'

const TermAndCondition = () => {

    const { resetScroll } = useContext(StoreContext)

    return (
        <div className='tac'>
            <h1 className='tac-h1'>Terms and Conditions</h1>
            <div className='tac-box1' >
                <h2>Website and Service Terms and Conditions -General</h2>
                <p>The e-athenaeum website (“Website”) and its related services (collectively, the “Service”) are governed by the following Terms and Conditions of Service (“Terms and Conditions”). By accessing or using any part of the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, including any future modifications.</p>
                <p>e-athenaeum reserves the right to amend, update, or change these Terms and Conditions at any time. In the event of such changes, we will post a notice on the Website for a minimum of 7 days, indicating that modifications have been made. The date of the latest revision will be noted at the bottom of the Terms and Conditions document. Revisions will become effective either (i) at the end of the 7-day notice period or (ii) upon your first access or use of the Service following the posting of changes, whichever occurs first.</p>
                <p>If you do not agree to comply with these Terms and Conditions, you are not authorized to use, access, or participate in the Service.</p>
            </div>

            <div className='tac-box1' >
                <h2>Copyright</h2>
                <p>All content on this site is the property of e-athenaeum. For complete copyright details, please read our full copyright policy below.</p>
                <p>All content on the e-athenaeum platform, including text, graphics, images, and other materials, is protected by copyright and owned by e-athenaeum, unless otherwise stated. Unauthorized use, reproduction, distribution, or modification of any content is strictly prohibited without prior written permission from e-athenaeum.</p>
            </div>

            <div className="tac-box1">
                <h2>Fair Usage Guidelines</h2>
                <p>e-athenaeum encourages the responsible and respectful use of its content for educational and non-commercial purposes. Users are permitted to:</p>
                <ul>
                    <li>
                        View and interact with the content on the platform for personal, educational, or research purposes.
                    </li>
                    <li>
                        Share links to e-athenaeum content, provided that proper attribution is given and the content remains unaltered.
                    </li>
                </ul>
                <p>Any use of e-athenaeum content beyond the scope of these guidelines requires explicit permission. For more information or to request permission for other uses, please contact us.</p>
            </div>

            <div className='tac-box1'>
                <h2>Registration</h2>
                <p>In connection with registering for and using the Service, you agree to the following:</p>
                <ul>
                    <li>You will provide accurate, current, and complete information about yourself and/or your organization as requested by e-athenaeum.</li>
                    <li>You will maintain the confidentiality of your password and any other information related to the security of your account.</li>
                    <li>You will maintain and promptly update any registration information you provide to e-athenaeum, whether during registration or throughout your use of e-athenaeum`s services, to ensure that such information remains accurate, current, and complete.</li>
                    <li>You will be fully responsible for all use of your account and any actions that occur under your account.</li>
                    <li>By signing up on e-athenaeum, you consent to be contacted by us via phone calls and/or SMS notifications for the purposes of offering our services, providing product knowledge, presenting promotional offers available on our website/app, sharing offers from associated third parties, and providing updates related to orders, shipments, or deliveries. This consent applies regardless of whether you have registered under Do Not Disturb (DND), Do Not Call (DNC), or National Customer Preference Register (NCPR) services.</li>
                </ul>
            </div>

            <div className="tac-box1">
                <h2>Subscriptions</h2>
                <p>You may choose to purchase a monthly or annual subscription.</p>
                <p>When you purchase a subscription, payment may be processed by third parties who act on our behalf of directly by the third party platform (e.g. Apple or Google). Rates for services are listed in the platform. e-athenaeum reserves the right to modify its rates at any time and/ or to offer special promo code. All payments are non-refundable. After your subscription ends, your service will be stopped unless you make a purchase.</p>
            </div>

            <div className="tac-box1">
                <h2>Your Promises and Assurances</h2>
                <p>You represent and warrant to e-athenaeum that your access and use of the Service will be in accordance with these Terms and Conditions and with all applicable laws, rules and regulations of Constitution of India and any other relevant jurisdiction, including those regarding online conduct or acceptable content, and those regarding the transmission of data or information exported from India and/or the jurisdiction in which you reside. You further represent and warrant that you have created or own any material you submit to e-athenaeum and that you have the right to grant us a license to use that material.</p>
            </div>

            <div className="tac-box1">
                <h2>Termination</h2>
                <p>e-athenaeum reserves the right to terminate your access to and use of the Service immediately, at any time, and for any reason. Upon termination, you will forfeit any further right to use the Service. You may terminate your e-athenaeum account at any time by following the instructions provided through the Service.</p>
                <p>The following provisions will continue to apply even after termination: protection and enforcement of e-athenaeum&apos;s proprietary rights, your Promises and Assurances, disclaimers of promises and Assurances, releases and indemnities, limitations of liability and types of damages, ownership of data and information, governing law and venue, and any other miscellaneous provisions.</p>
            </div>

            <div className="tac-box1">
                <h2>Proprietary Rights in Service Content and Activity Data</h2>
                <p>All content available through the Service, including but not limited to design, text, graphics, images, information, e-books, and other files, as well as their selection and arrangement (collectively referred to as the “Service Content”), is the proprietary property of e-athenaeum or its licensors. Unless expressly permitted by these Terms and Conditions, no Service Content may be modified, copied, distributed, framed, reproduced, republished, downloaded, scraped, displayed, posted, transmitted, or sold in any form or by any means, in whole or in part. The use of any data mining, robots, scraping, or similar data gathering or extraction methods to access the Service Content is strictly prohibited.
                    All data and information generated from your access to and use of the educational activities provided on or through the Service, including any translated content generated by you (collectively, the “Activity Data”), will be exclusively owned by e-athenaeum. You shall have no rights to use such Activity Data, except as expressly authorized by these Terms and Conditions. Please note that Activity Data does not include any material you submit for translation or the resulting translation.
                    By using the Service, you hereby assign to e-athenaeum all rights, title, and interest, including any intellectual property rights or proprietary rights, in the Activity Data. All rights not expressly granted to you under these Terms and Conditions are reserved by e-athenaeum and its licensors.
                </p>
            </div>

            <div className="tac-box1">
                <h2>Trademarks</h2>
                <p>The name &quot;e-athenaeum&quot; and all other trademarks, service marks, graphics, and logos used in connection with the Service are the trademarks or service marks of e-athenaeum or their respective owners. Accessing and using the Service does not grant you the right or license to reproduce or otherwise use the e-athenaeum name, or any e-athenaeum or third-party trademarks, service marks, graphics, or logos.</p>
            </div>

            <div className="tac-box1">
                <h2>Privacy</h2>
                <p>Use of the Service is also governed by our Privacy Policy, a copy of which is located at <Link onClick={resetScroll} to='/privacy-policy' >https://www.e-athenaeum.com/privacy</Link>. By using the Service, you consent to the terms of the Privacy Policy.</p>
            </div>

            <div className="tac-box1">
                <h2>Refund Policy</h2>
                <p>There is no refundable Policy.</p>
            </div>
        </div>
    )
}

export default TermAndCondition
