import LandingLayout from '@/layouts/LandingLayout';
import { Mail, MapPin, Briefcase, TrendingUp, ShieldCheck, Users } from 'lucide-react';
import { Newspaper, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/router';

const About = () => {

    const router = useRouter()
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Main Content */}
            <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <section className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                        About <span className="text-blue-600 dark:text-blue-400">Us</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Welcome to <span className="font-semibold text-gray-900 dark:text-white">Worldwide Short News</span>.
                        We are a digital-first news organization dedicated to delivering accurate, timely, and unbiased reporting
                        from every corner of the globe. Our commitment is to truth and transparency.
                    </p>
                </section>

                {/* Mission & Vision Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <div className="bg-white dark:bg-gray-800/50 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                            <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            To empower our global audience with verified, comprehensive, and accessible news.
                            We believe that information is a fundamental right, and we strive to bridge the gap
                            between complex events and public understanding through clear, concise journalism.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800/50 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6">
                            <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            To become the world's most trusted source for digital news, fostering an informed community
                            built on the pillars of integrity, accountability, and innovation in the media landscape.
                        </p>
                    </div>
                </section>

                {/* Editorial & Fact Checking Policy (Critical for AdSense) */}
                <section className="mb-20">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Standards</h2>
                            <p className="text-gray-600 dark:text-gray-400">The principles that guide our reporting every single day.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <div className="flex items-center mb-4">
                                    <Newspaper className="w-6 h-6 text-blue-600 mr-3" />
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Editorial Policy</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                    Our editorial team operates with complete independence. We carefully select stories based on their public interest,
                                    relevance, and impact. Every article is written to provide a neutral perspective, avoiding sensationalism
                                    and focusing on the facts.
                                </p>
                                <ul className="space-y-3">
                                    {[' unbiased reporting', 'Multiple source verification', 'Clear distinction between news and opinion'].map((item, i) => (
                                        <li key={i} className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <div className="flex items-center mb-4">
                                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Fact-Checking Policy</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                    Accuracy is non-negotiable. Our fact-checking process involves rigorous verification of data, quotes, and media.
                                    If an error is discovered, we are committed to correcting it promptly and transparently.
                                </p>
                                <ul className="space-y-3">
                                    {['Primary source validation', 'expert review for technical topics', 'Transparent correction validation'].map((item, i) => (
                                        <li key={i} className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="text-center mb-20">
                    <div className="flex items-center justify-center mb-4 space-x-2">
                        <Users className="w-6 h-6 text-blue-600" />
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Leadership</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
                        Driven by a team of experienced journalists and editors committed to excellence.
                    </p>

                    <div className="flex flex-wrap justify-center gap-8">
                        {/* Team Member 1 */}
                        <div className="w-64 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-100 dark:border-gray-700">
                            <div className="w-24 h-24 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full mb-4 flex items-center justify-center text-gray-400">
                                {/* Placeholder for Image */}
                                <span className="text-2xl">JD</span>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Jinal Prajapati</h4>
                            <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-3">Editor-in-Chief</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                15+ years in journalism, focusing on international relations and digital media transformation.
                            </p>
                        </div>


                    </div>
                </section>

                {/* Contact Section */}
                <section className="relative overflow-hidden rounded-3xl bg-gray-900 dark:bg-black text-white py-16 px-8">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <MapPin className="w-64 h-64 text-white transform rotate-12" />
                    </div>

                    <div className="relative z-10 max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                                <p className="text-gray-400 mb-8 text-lg">
                                    We value feedback from our readers. Whether you have a news tip, a correction, or an inquiry, we want to hear from you.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <MapPin className="w-6 h-6 text-blue-400 mt-1 mr-4 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-white">Headquarters</h4>
                                            <p className="text-gray-400 mt-1">
                                                Gandhinagar,382421, <br />
                                                Zundal, Prajapati vas<br />
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Mail className="w-6 h-6 text-blue-400 mt-1 mr-4 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-white">Email Us</h4>
                                            <div className="grid sm:grid-cols-2 gap-4 mt-2">
                                                <a href="mailto:contact@worldwideshortnews.com" className="text-gray-400 hover:text-white transition-colors">
                                                    General: contact@worldwideshortnews.com
                                                </a>
                                                {/* <a href="mailto:press@worldwideshortnews.com" className="text-gray-400 hover:text-white transition-colors">
                                                    Press: press@worldwideshortnews.com
                                                </a>
                                                <a href="mailto:ads@worldwideshortnews.com" className="text-gray-400 hover:text-white transition-colors">
                                                    Ads: ads@worldwideshortnews.com
                                                </a> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                                <h3 className="text-xl font-bold mb-4">Send us a Message</h3>
                                <p className="text-sm text-gray-400 mb-6">
                                    For quick inquiries, reach out directly. We aim to respond within 24 hours.
                                </p>
                                <button onClick={() => { router.push('/contact-us') }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}

About.getLayout = function getLayout(page: React.ReactElement) {
    return <LandingLayout>{page}</LandingLayout>;
};

export default About;