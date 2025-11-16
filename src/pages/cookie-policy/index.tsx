import LandingLayout from "@/layouts/LandingLayout";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white break-words">
            Cookie Policy
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
            Last Updated: January 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          
          {/* What are Cookies */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              1. What Are Cookies?
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words">
              Cookies are small text files stored on your device when you visit our news website. They help us remember your preferences and provide you with the best reading experience.
            </p>
          </section>

          {/* How We Use Cookies */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              2. How We Use Cookies
            </h2>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              <li className="break-words">• Remember your reading preferences and settings</li>
              <li className="break-words">• Keep track of articles you've read</li>
              <li className="break-words">• Analyze which news stories are most popular</li>
              <li className="break-words">• Improve our website performance and loading speed</li>
              <li className="break-words">• Show you relevant news recommendations</li>
            </ul>
          </section>

          {/* Types of Cookies */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              3. Types of Cookies We Use
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mb-1.5 sm:mb-2">
                  Necessary Cookies
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 break-words">
                  Essential for our news website to work properly. These cannot be turned off.
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mb-1.5 sm:mb-2">
                  Analytics Cookies
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 break-words">
                  Help us understand which news articles are popular and how readers use our site.
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mb-1.5 sm:mb-2">
                  Preference Cookies
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 break-words">
                  Remember your settings like dark/light mode, font size, and news categories.
                </p>
              </div>
            </div>
          </section>

          {/* Third Party Services */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              4. Third-Party Services
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-2 sm:mb-3 break-words">
              We use some external services that may set their own cookies:
            </p>
            <div className="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              <p className="break-words">
                <strong className="font-semibold">Google Analytics:</strong> To understand our website traffic and popular news content
              </p>
              <p className="break-words">
                <strong className="font-semibold">Social Media:</strong> For sharing news articles on Facebook, Twitter, etc.
              </p>
              <p className="break-words">
                <strong className="font-semibold">YouTube:</strong> For embedded news videos
              </p>
            </div>
          </section>

          {/* Managing Cookies */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              5. Managing Your Cookies
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                You can control cookies through:
              </p>
              <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                <li className="break-words">• Your web browser settings</li>
                <li className="break-words">• Our cookie consent banner when you first visit</li>
                <li className="break-words">• Clearing your browser data regularly</li>
              </ul>
              <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800">
                <p className="text-xs sm:text-sm text-orange-800 dark:text-orange-200 break-words">
                  <strong className="font-semibold">Note:</strong> Blocking cookies may affect your news reading experience and some features may not work properly.
                </p>
              </div>
            </div>
          </section>

          {/* Disable Cookies */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              6. How to Disable Cookies
            </h2>
            <div className="space-y-3">
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 break-words">
                To disable cookies in your browser:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4">
                  <h4 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                    Chrome & Edge
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 break-words">
                    Settings → Privacy → Cookies and site data
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4">
                  <h4 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                    Firefox
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 break-words">
                    Settings → Privacy & Security → Cookies
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4">
                  <h4 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                    Safari
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 break-words">
                    Preferences → Privacy → Cookies and website data
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4">
                  <h4 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                    Mobile Browsers
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 break-words">
                    Check your mobile browser's privacy settings
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              7. Policy Updates
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words">
              We may update this Cookie Policy occasionally. Any changes will be posted here with the updated date at the top of this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

CookiePolicy.getLayout = function getLayout(page: React.ReactElement) {
  return <LandingLayout>{page}</LandingLayout>;
};

export default CookiePolicy;