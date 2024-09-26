import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function FooterCom() {
  return (
    <Footer
      container
      className="text-white bg-gray-800 border-t-8 rounded-none border-t-pink-500 "
    >
      <div className="w-full px-6 py-8 mx-auto max-w-7xl">
        <div className="flex flex-col justify-between sm:flex-row">
          <div className="flex flex-col items-start">
            <Link to="/">
              <img
                src="/assets/Logo.png"
                className="h-10 mb-2 bg-white rounded w-30 md:h-16 md:w-38 sm:h-10"
                alt="Logo"
              />
            </Link>
            <p className="mb-2 text-sm font-semibold text-white">
              The best food blog.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 mb-2 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/"
                  rel="noopener noreferrer"
                  className="mb-2 font-semibold text-white"
                >
                  Home
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  rel="noopener noreferrer"
                  className="font-semibold text-white"
                >
                  About
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/contact"
                  rel="noopener noreferrer"
                  className="mb-2 font-semibold text-white"
                >
                  Contact
                </Footer.Link>
                <Footer.Link
                  href="/allPost"
                  rel="noopener noreferrer"
                  className="font-semibold text-white"
                >
                  All Posts
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className="border-gray-700" />
        <div className="flex flex-col items-center justify-between px-6 py-2 sm:flex-row">
          <Footer.Copyright
            href="#"
            by={`Foodeasy${' '} ${new Date().getFullYear()}`}
            className="font-semibold text-white text-md"
          />
        </div>
      </div>
    </Footer>
  );
}
