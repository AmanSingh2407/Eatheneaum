import { useContext } from 'react'
import { StoreContext } from '../../context/storecontextfile'
import './privacyPolicy.css'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'

const PrivacyPolicy = () => {

    const { resetScroll } = useContext(StoreContext)

    return (
        <div className='p-policy'>
            <Helmet>
                <title>Privacy Policy</title> 
            </Helmet>
            <div>
                <h1 className='p-policy-h1'>Privacy Policy</h1>
                <p className='p-policy-para'>Welcome to e-athenaeum platform, a learning platform where
                    users can read customise notes according to their current college
                    syllabus.
                    If any users want to connect with us, they can connect through
                    making notes according to syllabus, and also stipend are given
                    according to their notes view per month, by the company. Here, any
                    individuals or team can register using signup option.
                    We are committed to protecting the privacy of all users of our Site
                    and ensuring the security of their personal information. This Privacy
                    Policy outlines how we collect, use, disclose, and safeguard your
                    information when you use our Site and services.
                    By accessing or using e-athenaeum, you agree to the terms of this
                    Privacy Policy. If you do not agree with these terms, please do not
                    use our Site.
                </p>
            </div>
            <div className='p-policy-box1'>
                <h2 className='p-policy-box1-h2' >Information We Collect</h2>
                <p className='p-policy-box1-para'>We collect information from two main entities: Users and Creators. </p>
                <hr />
                <div className='p-policy-box1-sub' >
                    <h3>Information collected from Students</h3>
                    <div> <span><b>Personal Information</b></span><p> Name, contact number, email address, age, college, course, department. </p></div>
                    <div> <span><b>Usage Data</b></span>  <p> Information on how Students interact with our site, including pages visited, content accessed. </p></div>
                </div>
                <div className='p-policy-box1-sub' >
                    <h3>Information collected from Creators </h3>
                    <div> <span><b>Personal Information</b></span>  <p>Name, Phone number, email address, age, Gender, role, state, city, Password, confirm password, college, course, department, starting year, ending year.</p></div>
                    <div> <span><b>Organization Information</b></span> <p>Organization name, leader email, leader password, new leader email, new leader password, bank name, bank account number, IFSC code. </p></div>
                    <div> <span><b>Content Information</b></span> <p>Notes and other content submitted for verification and upload, including metadata such as file names, description, and creation dates.</p></div>
                </div>
                <div className='p-policy-box1-sub' >
                    <h3>Information collected from all Users</h3>
                    <div><span><b>Log Information</b></span>   <p> Access times, pages viewed, Web traffic data, and referring website addresses. </p></div>
                </div>
            </div>

            <div className='p-policy-box2' >
                <h2>How We Use Your Information </h2>
                <p className='p-policy-box2-para' >e-athenaeum uses the collected information for various purposes, including: </p>
                <hr />
                <div className='p-policy-box2-sub' >
                    <span><b>Service Provision</b></span>
                    <p>To operate and maintain our Site, manage user accounts, process payments, and fulfill subscription orders.</p>
                </div>
                <div className='p-policy-box2-sub' >
                    <span><b>Verification</b></span>
                    <p>To verify the identity and credentials of Creators, ensuring the  authenticity and quality of the content uploaded. </p>
                </div>
                <div className='p-policy-box2-sub' >
                    <span><b>Communication</b></span>
                    <p>To communicate with Students and Creator about their accounts, orders, support inquiries, and promotional  offers.</p>
                </div>
                <div className='p-policy-box2-sub' >
                    <span><b>Site Improvement</b></span>
                    <p>To understand how our Site is used, improve our services, and develop  new features and offerings.</p>
                </div>
                <div className='p-policy-box2-sub' >
                    <span><b>Legal Compliance</b></span>
                    <p>To comply with legal obligations, resolve disputes, enforce our agreements, and protect our rights.</p>
                </div>
            </div>

            <div className='p-policy-box2' >
                <h2>How We Share Your Information</h2>
                <p className='p-policy-box2-para' >e-athenaeum does not sell or rent personal information to third parties. We may share your information with </p>
                <hr />
                <div className='p-policy-box2-sub' >
                    <span><b>Service Providers</b></span>
                    <p>Third-party vendors and
                        service providers who perform services on our
                        behalf, such as payment processing, customer
                        support, hosting, and data analysis, under strict
                        confidentiality agreements.</p>
                </div>
                <div className='p-policy-box2-sub' >
                    <span><b>Legal Authorities</b></span>
                    <p>To comply with legal
                        obligations, court orders, or respond to lawful
                        requests from public authorities.
                    </p>
                </div>
                <div className='p-policy-box2-sub' >
                    <span><b>Business Transfers</b></span>
                    <p> In the event of a merger,
                        acquisition, or sale of all or a portion of our assets,
                        your information may be transferred as part of that
                        business transaction.</p>
                </div>
            </div>

            <div className='p-policy-box3' >
                <h2>Information Safety</h2>
                <p>All information is saved and stored on servers which
                    are secured with passwords and pins to ensure no
                    unauthorised person has access to it. Once your
                    information is in our possession we adhere to strict security guidelines, protecting it against unauthorized
                    access.
                </p>
            </div>

            <div className='p-policy-box4' >
                <h2>Rights</h2>
                <div className='p-policy-box4-sub'>
                    <h3>User Rights </h3>
                    <p className='p-policy-box4-sub-para'>Users of e-athenaeum have certain rights regarding their personal information:</p>
                    <ul>
                        <li>
                            <span><b>Access:</b></span>
                            <p>Request access to the personal information we hold about you. </p>
                        </li>
                        <li>
                            <span><b>Correction:</b></span>
                            <p>Request correction of any inaccuracies
                                in your personal information.</p>
                        </li>
                        <li>
                            <span><b>Deletion:</b></span>
                            <p> Request deletion of your personal
                                information, subject to certain exceptions (e.g.,
                                compliance with legal obligations).</p>
                        </li>
                    </ul>
                </div>

                <div className='p-policy-box4-sub'>
                    <h3>Creator Rights</h3>
                    <p className='p-policy-box4-sub-para'>Creators of e-athenaeum have certain specific rights
                        regarding their personal as well as content information:</p>
                    <ul>
                        <li>
                            <span><b>Access:</b></span>
                            <p>Creator have access to their own content.
                                They can view their payment details and views.</p>
                        </li>
                        <li>
                            <span><b>Organization Access:</b></span>
                            <p> Leader have right to add or
                                remove their member and modification. Only
                                Leader have right to request for uploading.</p>
                        </li>
                    </ul>
                </div>
                <div className='p-policy-box4-Link'><span>To exercise any of these rights, please contact us at</span> <Link onClick={resetScroll} to='/' >eathenaeum10@gmail.com</Link> </div>
            </div>

            <div className='p-policy-box3' >
                <h2>Third Party Links</h2>
                <p>Our Site may contain links to third-party websites. e-athenaeum is not responsible for the privacy practices
                    or content of such websites. We encourage you to
                    review the privacy policies of any third-party sites you
                    visit.
                </p>
            </div>

            <div className='p-policy-box3' >
                <h2>International Data Transfers</h2>
                <p>  Your personal information may be transferred to, and
                    maintained on, servers located outside of your state,
                    province, country, or other governmental jurisdiction
                    where the data protection laws may differ. By providing
                    us with your information, you consent to such
                    transfers.
                </p>
            </div>

            <div className='p-policy-box3' >
                <h2>Changes to this Privacy Policy</h2>
                <p>e-athenaeum reserves the right to update this Privacy
                    Policy at any time. Any changes will be posted on this
                    page with an updated effective date. We encourage
                    you to review this Privacy Policy periodically to stay
                    informed about how we are protecting your
                    information.
                </p>
            </div>

            <div className='p-policy-box3' >
                <h2>Choice/Opt-out</h2>
                <p>We provide all customers with the opportunity to opt-out of receiving non-essential (promotional, marketing-related) communications from Us on behalf of our
                    partners, and from Us in general, after providing Us
                    with personal information. If You want to remove your
                    contact information from all lists and newsletters,
                    please write to  <Link onClick={resetScroll} to='/'>eathenaeum10@gmail.com</Link>.
                </p>
            </div>

            <div className='p-policy-box3'>
                <h2>Contact Us</h2>
                <p>If you have any questions, concerns, or complaints
                    regarding this Privacy Policy or our data practices,
                    please contact us at:</p>
                <div>
                    <p><b>E-Athenaeum</b></p>
                    <p> Bundelkhand University, Jhansi, Uttar Pradesh (284128)</p>
                    <Link onClick={resetScroll} to='/'>eathenaeum10@gmail.com</Link>
                </div>

            </div>


        </div>

    )
}

export default PrivacyPolicy
