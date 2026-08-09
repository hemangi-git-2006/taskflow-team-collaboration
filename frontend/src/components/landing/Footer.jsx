function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-center">

          <div>
            <h2 className="text-3xl font-bold text-teal-400">
              TaskFlow
            </h2>

            <p className="text-slate-400 mt-2">
              Smart Team Collaboration Platform
            </p>
          </div>

          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-teal-400">
              Home
            </a>

            <a href="#" className="hover:text-teal-400">
              Features
            </a>

            <a href="#" className="hover:text-teal-400">
              Contact
            </a>

            <a href="#" className="hover:text-teal-400">
              Login
            </a>
          </div>

        </div>

        <hr className="my-8 border-slate-700" />

        <p className="text-center text-slate-500">
          © {new Date().getFullYear()} TaskFlow. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;