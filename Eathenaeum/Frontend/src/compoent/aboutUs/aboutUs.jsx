import { Helmet } from 'react-helmet';
import { assets } from '../../assets/assets';
import './about.css';

const AboutUs = () => {

 
    return (
        <div className='aboutUs'>
            <Helmet>
                <title>About Us</title>
            </Helmet>
            <h1 className='aboutUs-head'>About Us</h1>
            <p className='aboutUs-para'>Welcome to E-Athenaeum, your ultimate destination for high-quality, student-created notes. Born from the idea that shared knowledge empowers us all, we are dedicated to transforming the way students learn and succeed in their academic journeys.</p>
            <div className='aboutUs-box1'>
                <div className='aboutUs-box1-mv'>
                    <img src={assets.mission} alt="mission" />
                    <h2>Our Mission</h2>
                    <p>At  E-Athenaeum, our mission is simple: to provide students with the resources they need to excel in their studies. We believe that by offering access to well-organized, comprehensive notes, we can help students grasp complex concepts, save time, and achieve their academic goals.</p>
                </div>
                <div className='aboutUs-box1-mv'>
                    <img src={assets.vision} alt="vision" />
                    <h2>Our Vision</h2>
                    <p>We envision a world where every student has access to the best study materials, regardless of their background or location. By fostering a community of knowledge sharing, we aim to democratize education and create a collaborative learning environment that benefits everyone.</p>
                </div>
            </div>
            <div className='aboutUs-box2'>
                <h2>What We Offer</h2>
                <hr />
                <div>
                    <h3>Curated Notes</h3>
                    <p>Our platform features notes from top-performing students and subject matter experts, ensuring that you get reliable and insightful content.</p>
                </div>
                <div>
                    <h3>Diverse Subjects</h3>
                    <p>Whether your are studying sciences, humanities, or anything in between, our extensive library covers a wide range of subjects and topics.</p>
                </div>
                <div>
                    <h3>User-Friendly Platform</h3>
                    <p>Our intuitive interface makes it easy to find, purchase, and use notes, allowing you to focus on what matters most—your studies.</p>
                </div>
                <div>
                    <h3>Community Driven</h3>
                    <p>We encourage students to contribute their notes and earn by helping others, creating a thriving community of learners and educators.</p>
                </div>
            </div>
            <div className='aboutUs-box2'>
                <h2>Why Choose Us?</h2>
                <hr />
                <div>
                    <h3>Quality Assurance</h3>
                    <p>Each set of notes undergoes a rigorous review process to ensure accuracy and relevance.</p>
                </div>
                <div >
                    <h3>Affordable Pricing</h3>
                    <p>We offer competitive pricing to make high-quality educational resources accessible to all students.</p>
                </div>
                <div>
                    <h3>Continuous Improvement</h3>
                    <p>We constantly update our library with new notes and features based on user feedback, ensuring that we meet the evolving needs of our community.</p>
                </div>
            </div>
            <div className='aboutUs-box3'>
                <h2>Join Us</h2>
                <p>Join us at E-Athenaeum and be part of a movement that values shared knowledge and mutual growth. Together, let&apos;s make learning more effective, enjoyable, and accessible for everyone.</p>
            </div> 
        </div>
    )
}

export default AboutUs
