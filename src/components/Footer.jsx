const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="font-montserrat tracking-wide py-5 shadow-2xl shadow-black mt-16  small-screen-padding ">
      <div className="max-container flex flex-col items-center gap-2 lg:flex-row lg:justify-between lg:items-center">
        <small>Copyright &copy; {currentYear}</small>
        <div className="flex flex-col-reverse lg:flex-row items-center gap-2">
          <img
            src="/src/assets/images/tmdb_logo.svg"
            alt="tmdb logo"
            width={45}
          />
          <small className="text-center">
            This product uses the{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              className="theme-gradient-text">
              TMDB API
            </a>{" "}
            but is not endorsed or certified by TMDB.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
