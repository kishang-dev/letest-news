import React from 'react';
import { Calendar, AlertTriangle, Globe } from 'lucide-react';
import LandingLayout from '@/layouts/LandingLayout';

const TermsOfUsePage = () => {
    const today = new Date();
    const lastUpdated = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                    <div className="text-start">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2 break-words">
                            Terms of Use
                        </h1>
                        <div className="flex items-center justify-start text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base">
                            <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                            <span className="break-words">Last updated: {lastUpdated}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
                <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border dark:border-gray-700 p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 md:space-y-8">

                    {/* Introduction */}
                    <section>
                        <div className="flex items-center mb-2.5 sm:mb-3 md:mb-4">
                            <Globe className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400 mr-2 sm:mr-2.5 md:mr-3 flex-shrink-0" />
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white break-words">
                                Introduction
                            </h2>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed break-words">
                            Welcome to our website. These Terms of Use ("Terms") govern your use of our website and services.
                            By accessing or using our services, you agree to be bound by these Terms. If you do not agree
                            to these Terms, please do not use our services.
                        </p>
                    </section>

                    {/* Acceptance of Terms */}
                    <section>
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-2.5 md:mb-3 break-words">
                            1. Acceptance of Terms
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 break-words">
                            By accessing and using this website, you accept and agree to be bound by the terms and provision
                            of this agreement. Additionally, when using this website's particular services, you shall be
                            subject to any posted guidelines or rules applicable to such services.
                        </p>
                    </section>

                    {/* Use License */}
                    <section>
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-2.5 md:mb-3 break-words">
                            2. Use License
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 break-words">
                            Permission is granted to temporarily access the materials on our website for personal,
                            non-commercial viewing only. This is the grant of a license, not a transfer of title,
                            and under this license you may not:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm sm:text-base space-y-1.5 sm:space-y-2 ml-2 sm:ml-4">
                            <li className="break-words pl-1">modify or copy the materials</li>
                            <li className="break-words pl-1">use the materials for any commercial purpose or for any public display</li>
                            <li className="break-words pl-1">attempt to reverse engineer any software contained on the website</li>
                            <li className="break-words pl-1">remove any copyright or other proprietary notations from the materials</li>
                        </ul>
                    </section>

                    {/* Website Use */}
                    <section>
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-2.5 md:mb-3 break-words">
                            3. Website Use
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 break-words">
                            This website is provided for informational purposes only. You agree to use this website
                            in accordance with all applicable laws and regulations. You are solely responsible for
                            ensuring that your use of this website complies with all applicable laws.
                        </p>
                    </section>

                    {/* Prohibited Uses */}
                    <section>
                        <div className="flex items-center mb-2.5 sm:mb-3 md:mb-4">
                            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0" />
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white break-words">
                                4. Prohibited Uses
                            </h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 break-words">
                            You may not use our service:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm sm:text-base space-y-1.5 sm:space-y-2 ml-2 sm:ml-4">
                            <li className="break-words pl-1">For any unlawful purpose or to solicit others to perform unlawful acts</li>
                            <li className="break-words pl-1">To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                            <li className="break-words pl-1">To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                            <li className="break-words pl-1">To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                            <li className="break-words pl-1">To submit false or misleading information</li>
                            <li className="break-words pl-1">To upload or transmit viruses or any other type of malicious code</li>
                            <li className="break-words pl-1">To interfere with or circumvent the security features of the service</li>
                        </ul>
                    </section>

                    {/* Intellectual Property */}
                    <section>
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-2.5 md:mb-3 break-words">
                            5. Intellectual Property Rights
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 break-words">
                            The service and its original content, features, and functionality are and will remain the
                            exclusive property of our company and its licensors. The service is protected by copyright,
                            trademark, and other laws.
                        </p>
                    </section>

                    {/* Third Party Links */}
                    <section>
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-2.5 md:mb-3 break-words">
                            6. Third Party Links
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed break-words">
                            Our website may contain links to third-party websites or services that are not owned or
                            controlled by us. We have no control over, and assume no responsibility for, the content,
                            privacy policies, or practices of any third-party websites or services.
                        </p>
                    </section>

                    {/* Service Availability */}
                    <section>
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-2.5 md:mb-3 break-words">
                            7. Service Availability
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed break-words">
                            We reserve the right to withdraw or amend our service, and any service or material we
                            provide on the website, in our sole discretion without notice. We will not be liable
                            if for any reason all or any part of the website is unavailable at any time or for any period.
                        </p>
                    </section>

                    {/* Disclaimer */}
                    <section>
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-2.5 md:mb-3 break-words">
                            8. Disclaimer
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed break-words">
                            The information on this website is provided on an "as is" basis. To the fullest extent
                            permitted by law, this Company excludes all representations, warranties, conditions and
                            terms relating to our website and the use of this website.
                        </p>
                    </section>

                    {/* Limitation of Liability */}
                    <section>
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-2.5 md:mb-3 break-words">
                            9. Limitation of Liability
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed break-words">
                            In no case shall our company, nor its directors, employees and affiliates, be held liable
                            for anything arising out of or in any way connected with your use of this website whether
                            such liability is under contract, tort or otherwise.
                        </p>
                    </section>

                    {/* Governing Law */}
                    <section>
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-2.5 md:mb-3 break-words">
                            10. Governing Law
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed break-words">
                            These Terms shall be interpreted and governed by the laws of the jurisdiction in which
                            our company is established, without regard to its conflict of law provisions.
                        </p>
                    </section>

                    {/* Changes to Terms */}
                    <section>
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-2.5 md:mb-3 break-words">
                            11. Changes to Terms
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed break-words">
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                            If a revision is material, we will try to provide at least 30 days notice prior to any new
                            terms taking effect. What constitutes a material change will be determined at our sole discretion.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

TermsOfUsePage.getLayout = function getLayout(page: React.ReactElement) {
    return <LandingLayout>{page}</LandingLayout>;
};

export default TermsOfUsePage;