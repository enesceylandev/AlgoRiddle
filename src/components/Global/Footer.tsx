import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faAddressCard, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

const FooterLink: React.FC<{ to: string; text: string }> = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="text-slate-600 dark:text-slate-400 hover:underline"
    >
      {text}
    </Link>
  );
};

const FooterSection: React.FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="lg:col-span-2 col-span-5 flex flex-col">
      <h1 className="text-slate-900 dark:text-slate-100 text-xl font-semibold mb-2">
        {title}
      </h1>
      {children}
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <div className="border-t dark:border-slate-800 w-full flex justify-center px-16 py-6">
      <div className="lg:max-w-[1000px] w-full flex flex-col justify-between space-y-9">
        <div className="grid grid-cols-10 lg:space-y-0 space-y-8">
          <div className="lg:col-span-6 col-span-10 space-y-2">
            <Link
              to="/"
              className="text-3xl font-semibold text-slate-900 dark:text-slate-100"
            >
              {process.env.REACT_APP_BRANDNAME}
            </Link>
          </div>
          <FooterSection title="Product">
            <FooterLink to="/play" text="Play" />
            <FooterLink to="/about#team" text="Team" />
          </FooterSection>
          <FooterSection title="Company">
            <FooterLink to="/about" text="About" />
          </FooterSection>
        </div>
        <div className="sm:justify-end justify-center items-center flex text-xl space-x-5 text-slate-800 dark:text-slate-100">
          <a
            href="https://enesceylan.dev/"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-md dark:hover:bg-slate-800 hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faAddressCard} />
          </a>
          <a
            href="https://www.linkedin.com/in/enesceylandev/"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-md dark:hover:bg-slate-800 hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://github.com/enesceylandev"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-md dark:hover:bg-slate-800 hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="mailto:contact@enesceylan.dev"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-md dark:hover:bg-slate-800 hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
