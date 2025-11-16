import LandingLayout from '@/layouts/LandingLayout';
import { Mail, MapPin, Briefcase, TrendingUp, MessageCircle } from 'lucide-react';


const  About = () => {
    return (

        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Main Content */}
            <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <section className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">About Us</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Welcome to News, your trusted source for the latest updates and stories from around the world.
                        We are dedicated to delivering accurate, timely, and unbiased news to keep you informed.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Our Mission</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Our mission is to provide reliable and comprehensive news coverage, empowering our readers with knowledge to make informed decisions.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Our Vision</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            We aim to be the leading news platform, fostering an informed community through integrity and innovation in journalism.
                        </p>
                    </div>
                </section>

                <section className="text-center mb-12">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Our Team</h3>
                    <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
                        Our team consists of passionate journalists and editors committed to delivering high-quality content. We work tirelessly to bring you the news that matters most.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="w-48 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <div className="h-24 w-24 mx-auto bg-gray-300 dark:bg-gray-600 rounded-full mb-2"></div>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">John Doe</h4>
                            <p className="text-gray-500 dark:text-gray-400">Editor-in-Chief</p>
                        </div>
                        <div className="w-48 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <div className="h-24 w-24 mx-auto bg-gray-300 dark:bg-gray-600 rounded-full mb-2"></div>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Jane Smith</h4>
                            <p className="text-gray-500 dark:text-gray-400">Senior Reporter</p>
                        </div>
                        <div className="w-48 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <div className="h-24 w-24 mx-auto bg-gray-300 dark:bg-gray-600 rounded-full mb-2"></div>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Rakesh Rai</h4>
                            <p className="text-gray-500 dark:text-gray-400">Executive Editor</p>
                        </div>
                    </div>
                </section>

                <section className="py-20 px-4 relative overflow-hidden">

                    <div className="relative max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg">
                                <Mail className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
                                Get in Touch
                            </h3>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                We're here to help. Reach out to us through any of the channels below.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Address Card */}
                            <div className="group">
                                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/50 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500">
                                    <div className="flex items-center mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <MapPin className="w-6 h-6 text-white" />
                                        </div>
                                        <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 ml-4">Our Office</h4>
                                    </div>

                                    <div className="space-y-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                                        <p className="font-semibold text-gray-800 dark:text-gray-200">Network18 Media & Investment Ltd</p>
                                        <p>Shree Ram Mill Compound,</p>
                                        <p>Vrindavan Building,</p>
                                        <p>Ganpatrao Kadam Marg,</p>
                                        <p className="font-medium">Worli, Mumbai-400013</p>
                                    </div>

                                    {/* Decorative element */}
                                    <div className="mt-6 h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full group-hover:w-32 transition-all duration-500"></div>
                                </div>
                            </div>

                            {/* Contact Methods */}
                            <div className="space-y-6">
                                {[
                                    {
                                        icon: MessageCircle,
                                        title: "Press Release",
                                        email: "pressrelease@text.com",
                                        description: "Share your news and announcements",
                                        gradient: "from-rose-500 to-pink-500",
                                        bgGradient: "from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20"
                                    },
                                    {
                                        icon: Mail,
                                        title: "Feedback",
                                        email: "feedback@text.com",
                                        description: "We value your thoughts and suggestions",
                                        gradient: "from-blue-500 to-cyan-500",
                                        bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
                                    },
                                    {
                                        icon: Briefcase,
                                        title: "Careers",
                                        email: "jobs@text.com",
                                        description: "Join our talented team",
                                        gradient: "from-violet-500 to-purple-500",
                                        bgGradient: "from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20"
                                    },
                                    {
                                        icon: TrendingUp,
                                        title: "Advertising",
                                        email: "ads@text.com",
                                        description: "Explore partnership opportunities",
                                        gradient: "from-amber-500 to-orange-500",
                                        bgGradient: "from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20"
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="group">
                                        <a
                                            href={`mailto:${item.email}`}
                                            className={`block bg-gradient-to-r ${item.bgGradient} rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-14 h-14 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                    <item.icon className="w-7 h-7 text-white" />
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <h5 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                                                        {item.title}
                                                    </h5>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                        {item.description}
                                                    </p>
                                                    <p className={`font-medium bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block`}>
                                                        {item.email}
                                                    </p>
                                                </div>
                                                <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                                        <span className="text-2xl">→</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))}
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