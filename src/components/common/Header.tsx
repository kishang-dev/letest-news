import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useSearchStore } from "@/store/useSearchStore";

type NavItem = {
  label: string;
  value: string;
  dropdown?: string[];
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { searchQuery, setSearchQuery } = useSearchStore();

  const router = useRouter();
  const [activeItem, setActiveItem] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navItems: NavItem[] = [
    { label: "Home", value: "Home" },
    { label: "World", value: "World" },
    { label: "Business & Markets", value: "Business & Markets" },
    { label: "Sports", value: "Sports" },
    { label: "Technology", value: "Technology" },
    { label: "Entertainment", value: "Entertainment" },
    { label: "Politics", value: "Politics" },
  ];

  // Set active item based on URL query parameter
  useEffect(() => {
    if (router.query.category) {
      setActiveItem(decodeURIComponent(router.query.category as string));
    } else if (router.pathname === "/") {
      setActiveItem("Home");
    }
  }, [router.query.category, router.pathname]);

  // Focus search input when search expands
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 200);
    }
  }, [isSearchExpanded]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value) {
      setActiveItem(value);
      router.push({
        pathname: "/",
        query: { category: value }
      });
    }
  };

  const handleClick = (value: string) => {
    setActiveItem(value);

    if (value === "Home") {
      router.push("/");
      setIsOpen(false);
      return;
    }
    
    router.push({
      pathname: "/",
      query: { category: value }
    });
    setIsOpen(false);
  };

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchQuery("");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search query:", searchQuery);
      // router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsSearchExpanded(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm dark:shadow-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 
              onClick={() => router.push('/')}
              className="cursor-pointer text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              WORLD NEWS
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => (
              <div key={item.label}>
                {item?.dropdown ? (
                  <div className="relative group">
                    <select
                      onChange={handleSelectChange}
                      className="appearance-none bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 px-3 xl:px-4 py-2 rounded-lg cursor-pointer outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-0 transition-all duration-200 text-sm xl:text-base pr-8"
                    >
                      <option value="" className="cursor-pointer bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                        {item.label}
                      </option>
                      {item?.dropdown.map((subItem) => (
                        <option
                          key={subItem}
                          value={subItem}
                          className="cursor-pointer bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          {subItem}
                        </option>
                      ))}
                    </select>
                    <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400 pointer-events-none group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                ) : (
                  <a
                    onClick={() => handleClick(item.value)}
                    className={`cursor-pointer inline-flex items-center justify-center h-10 px-3 xl:px-4 py-2 rounded-lg transition-all duration-200 text-sm xl:text-base font-medium ${
                      activeItem === item.value
                        ? "border-l-2 border-blue-600 text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-800"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Expandable Search */}
            <div className="flex items-center">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <div className="relative flex items-center">
                  {/* Search Input - Expands from right to left */}
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    onBlur={() => !searchQuery && setIsSearchExpanded(false)}
                    className={`h-10 pl-4 pr-12 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300 ease-in-out placeholder-gray-500 dark:placeholder-gray-400 ${
                      isSearchExpanded
                        ? 'w-64 sm:w-80 opacity-100 scale-100'
                        : 'w-0 opacity-0 scale-95 pointer-events-none'
                    }`}
                  />

                  {/* Search Button */}
                  <button
                    type={isSearchExpanded ? "submit" : "button"}
                    onClick={!isSearchExpanded ? handleSearchToggle : undefined}
                    className={`hidden lg:inline-flex absolute right-0 items-center justify-center h-10 w-10 rounded-full transition-all duration-300 ${
                      isSearchExpanded
                        ? 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>

                  {/* Close Button - Only visible when expanded */}
                  {isSearchExpanded && (
                    <button
                      type="button"
                      onClick={handleSearchToggle}
                      className="absolute -right-12 inline-flex items-center justify-center h-10 w-10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-500 dark:hover:text-red-400 rounded-full transition-all duration-200"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center h-10 w-10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>

              {/* Mobile Menu Overlay */}
              {isOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm transition-opacity duration-200"
                    onClick={() => setIsOpen(false)}
                  ></div>

                  {/* Mobile Menu Panel */}
                  <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-xl dark:shadow-2xl transform transition-transform duration-200 ease-out">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center justify-center h-10 w-10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all duration-200"
                        aria-label="Close menu"
                      >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Mobile Search */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <form onSubmit={handleSearchSubmit}>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search articles, news..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                          />
                          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </form>
                    </div>

                    {/* Mobile Menu Items */}
                    <div className="flex flex-col p-4 space-y-2 overflow-y-auto">
                      {navItems.map((item) => (
                        <div key={item.label}>
                          {item.dropdown ? (
                            <div className="space-y-1">
                              <a
                                onClick={() => handleClick(item.value)}
                                className={`cursor-pointer flex items-center w-full p-3 rounded-lg transition-all duration-200 font-medium ${
                                  activeItem === item.value
                                    ? "text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-800"
                                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                                }`}
                              >
                                {item.label}
                              </a>
                              <div className="ml-4 space-y-1">
                                {item.dropdown.map((subItem) => (
                                  <a
                                    key={subItem}
                                    onClick={() => {
                                      setActiveItem(subItem);
                                      router.push({
                                        pathname: "/",
                                        query: { category: subItem }
                                      });
                                      setIsOpen(false);
                                    }}
                                    className={`cursor-pointer flex items-center w-full p-2 text-sm rounded-lg transition-all duration-200 ${
                                      activeItem === subItem
                                        ? "text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                                    }`}
                                  >
                                    {subItem}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <a
                              onClick={() => handleClick(item.value)}
                              className={`cursor-pointer flex items-center w-full p-3 rounded-lg transition-all duration-200 font-medium ${
                                activeItem === item.value
                                  ? "text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-800"
                                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                              }`}
                            >
                              {item.label}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;