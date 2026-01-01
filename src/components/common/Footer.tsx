"use client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Footer = () => {
  const router = useRouter();

  const [activeItem, setActiveItem] = useState("");
  const navigationItems = [
    { value: "Home", label: "Home" },
    { value: "World", label: "World" },
    { value: "Business & Markets", label: "Business & Markets" },
    { value: "Sports", label: "Sports" },
    { value: "Technology", label: "Technology" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Politics", label: "Politics" },
  ];

  const footerLinks = [
    { label: "ABOUT US", value: "/about-us" },
    { label: "CONTACT US", value: "/contact-us" },
    { label: "PRIVACY POLICY", value: "/privacy-policy" },
    { label: "COOKIE POLICY", value: "/cookie-policy" },
    { label: "TERMS OF USE", value: "/terms-of-use" },
  ];

  // Set active item based on URL category parameter
  useEffect(() => {
    const cat = router.query.category;
    if (typeof cat === "string") {
      setActiveItem(decodeURIComponent(cat));
    } else {
      setActiveItem("Home");
    }
  }, [router.query]);

  const handleClick = (value: string) => {
    setActiveItem(value);

    // Start from the current query object (preserves other params)
    const newQuery = { ...router.query };

    if (value === "Home") {
      delete newQuery.category; // remove the param for Home
    } else {
      newQuery.category = value;
    }

    router.push(
      { pathname: "/", query: newQuery },
      undefined,
      { shallow: true }
    );
  }

  // Dynamic classes for active/inactive navigation links
  const getNavLinkClasses = (item: string) => {
    const isActive = activeItem === item;
    return `cursor-pointer transition-all duration-200 block py-2 px-3 rounded-md ${isActive
      ? "text-blue-600 dark:text-blue-400   font-medium border-l-2 border-blue-600 dark:border-blue-400"
      : "text-muted-foreground hover:text-foreground hover:bg-accent"
      }`;
  };

  return (
    <footer className="bg-footer-bg text-foreground">
      <div className="container mx-auto px-4 py-12">

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">About WORLD NEWS</h3>
            <p className="text-sm mb-4 text-muted-foreground">
              Your trusted source for AI-powered news and insights from around the world.
            </p>
            {/* <div className="flex space-x-3">
              <a
                href="#"
                className="inline-flex items-center justify-center h-10 w-10 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center h-10 w-10 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center h-10 w-10 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.098.119.112.223.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.749-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center h-10 w-10 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div> */}
          </div>

          {/* Navigation Section 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-1">
              {navigationItems.slice(0, 4).map((item) => (
                <li key={item.value}>
                  <a
                    onClick={() => handleClick(item.value)}
                    className={getNavLinkClasses(item.value)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Section 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Categories</h3>
            <ul className="space-y-1">
              {navigationItems.slice(4).map((item) => (
                <li key={item.value}>
                  <a
                    onClick={() => handleClick(item.value)}
                    className={getNavLinkClasses(item.value)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* YouTube Section */}
          {/* <div>
            <div className="bg-card p-4 rounded-lg border">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary p-2 rounded">
                  <svg
                    className="h-6 w-6 text-primary-foreground"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <div>
                  <p className="text-foreground font-semibold">WORLD NEWS</p>
                  <p className="text-muted-foreground text-sm">is on Youtube</p>
                </div>
              </div>
              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors">
                Subscribe Now
              </button>
            </div>
          </div> */}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              Copyright © 2025. WORLD NEWS - All Rights Reserved.
            </p>
            <div className="flex flex-wrap gap-4">
              {footerLinks.map((link, index) => {
                const isActive = router.pathname === link.value;
                return (
                  <span key={link.value} className="flex items-center">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(link.value);
                      }}
                      className={`text-sm transition-colors cursor-pointer ${isActive
                        ? "text-blue-600 font-medium" // Active state - primary color and bold
                        : "text-muted-foreground hover:text-foreground" // Inactive state
                        }`}
                    >
                      {link.label}
                    </a>
                    {index < footerLinks.length - 1 && (
                      <span className="text-muted-foreground mx-2">|</span>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;