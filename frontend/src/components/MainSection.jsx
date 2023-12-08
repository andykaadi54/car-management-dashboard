import { useNavigate } from "react-router-dom";

const MainSection = () => {
  const navigate = useNavigate();
  return (
    <header id="main-section" className="main-section">
      <nav className="navbar navbar-expand-lg bg-transparent">
        <div className="container navbar-menu">
          <img src="https://i.ibb.co/4gw2rTn/logo.png" alt="logo" />
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                BCR
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div className="navbar-nav ms-auto">
                <a className="nav-link" href="#our-service">
                  Our Services
                </a>
                <a className="nav-link" href="#why-us">
                  Why Us
                </a>
                <a className="nav-link" href="#testimonial">
                  Testimonial
                </a>
                <a className="nav-link" href="#faq">
                  FAQ
                </a>
                <button className="button">Register</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 hero-desc">
              <h1>Sewa & Rental Mobil Terbaik di kawasan (Lokasimu)</h1>
              <p>
                Selamat datang di Binar Car Rental. Kami menyediakan mobil
                kualitas terbaik dengan harga terjangkau. Selalu siap melayani
                kebutuhanmu untuk sewa mobil selama 24 jam.
              </p>
              <button
                id="btn-sewa"
                className="button"
                onClick={() => navigate("/search")}
              >
                Mulai Sewa Mobil
              </button>
            </div>
          </div>
        </div>
        <div className="hero-img">
          <img
            src="https://i.ibb.co/JHpKMN5/img-car.png"
            alt="img-car"
            className="img-fluid"
          />
        </div>
      </section>
    </header>
  );
};
export default MainSection;
