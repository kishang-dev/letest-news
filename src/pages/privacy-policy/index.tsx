import LandingLayout from "@/layouts/LandingLayout";
import Head from 'next/head';

const PrivacyPolicy = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      <Head>
        <title>Privacy Policy - Worldwide Short News</title>
        <meta name="description" content="Privacy Policy for Worldwide Short News regarding AdSense, GDPR, and CCPA compliance." />
      </Head>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last Updated: {currentDate}
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white  rounded-2xl shadow-sm p-8 sm:p-12 prose dark:prose-invert max-w-none">

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              At Worldwide Short News, accessible from our website, one of our main priorities is the privacy of our visitors.
              This Privacy Policy document contains types of information that is collected and recorded by Worldwide Short News and how we use it.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
              This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Worldwide Short News.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Consent</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Information We Collect</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li><strong>Direct Contact:</strong> If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</li>
              <li><strong>Account Registration:</strong> When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Log Files</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Worldwide Short News follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as a part of hosting services' analytics.
              The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
              These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Cookies and Web Beacons</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Like any other website, Worldwide Short News uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.
              The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>
          </section>

          {/* AdSense Specific Section - Critical */}
          <section className="mb-8 bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Google DoubleClick DART Cookie</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet.
              However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – {' '}
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 underline decoration-blue-300 font-medium">
                https://policies.google.com/technologies/ads
              </a>
            </p>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">Our Advertising Partners</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Google:</strong>{' '}
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 underline">
                  https://policies.google.com/technologies/ads
                </a>
              </li>
            </ul>
          </section>

          {/* GDPR Section - Critical for Europe */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. GDPR Data Protection Rights</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'The right to access', desc: 'You have the right to request copies of your personal data.' },
                { title: 'The right to rectification', desc: 'You have the right to request that we correct any information you believe is inaccurate.' },
                { title: 'The right to erasure', desc: 'You have the right to request that we erase your personal data, under certain conditions.' },
                { title: 'The right to restrict processing', desc: 'You have the right to request that we restrict the processing of your personal data, under certain conditions.' },
                { title: 'The right to object to processing', desc: 'You have the right to object to our processing of your personal data, under certain conditions.' },
                { title: 'The right to data portability', desc: 'You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.' }
              ].map((right, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">{right.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{right.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4 text-sm">
              If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
            </p>
          </section>

          {/* CCPA Section - Critical for US/California */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Under the CCPA, among other rights, California consumers have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
              <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
              <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Children's Information</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Worldwide Short News does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}

PrivacyPolicy.getLayout = function getLayout(page: React.ReactElement) {
  return <LandingLayout>{page}</LandingLayout>;
};

export default PrivacyPolicy;