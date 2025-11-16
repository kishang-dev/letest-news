import LandingLayout from "@/layouts/LandingLayout";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white break-words">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
            Effective Date: January 1, 2024
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              1. Introduction
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              This Privacy Policy describes how we collect, use, and protect your information when you use our news website.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              2. Information We Collect
            </h2>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              <p className="break-words">
                <strong className="font-semibold">Personal Information:</strong> Name, email address when you subscribe or contact us
              </p>
              <p className="break-words">
                <strong className="font-semibold">Usage Information:</strong> Pages visited, time spent on site, device information
              </p>
              <p className="break-words">
                <strong className="font-semibold">Cookies:</strong> We use cookies to improve your browsing experience
              </p>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              3. How We Use Your Information
            </h2>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              <li className="break-words">• To provide you with news content and services</li>
              <li className="break-words">• To send newsletters (with your consent)</li>
              <li className="break-words">• To improve our website and user experience</li>
              <li className="break-words">• To respond to your inquiries and comments</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              4. Information Sharing
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words">
              We do not sell or share your personal information with third parties, except when required by law or with your explicit consent.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              5. Data Security
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words">
              We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              6. Your Rights
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-2 sm:mb-3">
              You have the right to:
            </p>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              <li className="break-words">• Access your personal information</li>
              <li className="break-words">• Update or delete your information</li>
              <li className="break-words">• Unsubscribe from our emails</li>
              <li className="break-words">• Disable cookies in your browser</li>
            </ul>
          </section>

          {/* Third Party Links */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              7. Third-Party Links
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words">
              Our website may contain links to other websites. We are not responsible for the privacy practices of those sites.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              8. Changes to This Policy
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with a new effective date.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

PrivacyPolicy.getLayout = function getLayout(page: React.ReactElement) {
  return <LandingLayout>{page}</LandingLayout>;
};

export default PrivacyPolicy;