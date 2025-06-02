import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <i className="bi-film me-2 fs-4 text-danger"></i>
          <span className="text-white">Cinema Matheus</span>
        </Link>
        <button
          className="navbar-toggler"
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/filmes')}`} to="/filmes">
                <i className="bi bi-collection-play-fill me-1"></i> Filmes
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/salas')}`} to="/salas">
                <i className="bi bi-person-workspace me-1"></i> Salas
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/sessoes')}`} to="/sessoes">
                <i className="bi bi-clock-history me-1"></i> Sessões
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/ingressos')}`} to="/ingressos">
                <i className="bi bi-ticket-fill me-1"></i> Ingressos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}