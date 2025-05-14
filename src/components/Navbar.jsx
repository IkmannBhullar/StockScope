import { useState } from "react";
import { Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import newImage from "/news.jpg";
import stockImage from "/logo_stockscope.jpg";

const Navbar = ({ onOpenSearch }) => {
  const [active, setActive] = useState(null);

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
      className="className=w-full flex justify-center"
    >
      <div className="relative z-[999]">
        <Menu setActive={setActive}>
          <MenuItem item="Home" active={active} setActive={setActive}>
            <HoveredLink to="/">Dashboard</HoveredLink>
            <HoveredLink to="/">Explore</HoveredLink>
          </MenuItem>

          <MenuItem item="Watchlist" active={active} setActive={setActive}>
            <ProductItem
              title="Track Stocks"
              description="Monitor your personalized watchlist."
              href="/watchlist"
              src={stockImage}
            />
          </MenuItem>

          <MenuItem item="News" active={active} setActive={setActive}>
            <ProductItem
              title="Latest News"
              description="Get live financial updates."
              href="/news"
              src={newImage}
            />
          </MenuItem>

          <MenuItem item="About" active={active} setActive={setActive}>
            <HoveredLink to="/about">Team</HoveredLink>
            <HoveredLink to="/about">Contact</HoveredLink>
          </MenuItem>

          <MenuItem item="🔍 Search" active={active} setActive={setActive}>
            <button
              onClick={onOpenSearch}
              className="block text-left text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 w-full"
            >
              Open Stock Search
            </button>
          </MenuItem>
        </Menu>
      </div>
    </motion.div>
  );
};

const HoveredLink = ({ to, children }) => (
  <Link
    to={to}
    className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
  >
    {children}
  </Link>
);

export default Navbar;