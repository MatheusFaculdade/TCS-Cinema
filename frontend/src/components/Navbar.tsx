import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg py-3 sticky-top">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center fw-bold me-4" to="/">
          <i className="bi bi-film me-2 fs-3 text-danger"></i>
          <span className="text-white fs-4">Cinema Matheus</span>
        </Link>

        {/* Mobile toggle button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <Link 
                className={`nav-link px-3 py-2 rounded-pill transition-all ${isActive('/filmes')} ${
                  location.pathname === '/filmes' 
                    ? 'bg-danger text-white fw-semibold' 
                    : 'text-light hover-effect'
                }`} 
                to="/filmes"
              >
                <i className="bi bi-collection-play-fill me-2"></i>
                Filmes
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link 
                className={`nav-link px-3 py-2 rounded-pill transition-all ${isActive('/salas')} ${
                  location.pathname === '/salas' 
                    ? 'bg-danger text-white fw-semibold' 
                    : 'text-light hover-effect'
                }`} 
                to="/salas"
              >
                <i className="bi bi-person-workspace me-2"></i>
                Salas
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link 
                className={`nav-link px-3 py-2 rounded-pill transition-all ${isActive('/sessoes')} ${
                  location.pathname === '/sessoes' 
                    ? 'bg-danger text-white fw-semibold' 
                    : 'text-light hover-effect'
                }`} 
                to="/sessoes"
              >
                <i className="bi bi-clock-history me-2"></i>
                Sessões
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link 
                className={`nav-link px-3 py-2 rounded-pill transition-all ${isActive('/ingressos')} ${
                  location.pathname === '/ingressos' 
                    ? 'bg-danger text-white fw-semibold' 
                    : 'text-light hover-effect'
                }`} 
                to="/ingressos"
              >
                <i className="bi bi-ticket-fill me-2"></i>
                Ingressos
              </Link>
            </li>


          </ul>
        </div>
        <div>
          <Link 
            className="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold" 
            to="/#"
          >
            <i className="bi bi-person-circle me-2"></i>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}