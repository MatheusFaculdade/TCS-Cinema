import './style.css';
import { Filme } from '../../models/Filme';

interface Props {
  filme: Filme;
  imageUrl: string;
  onEdit: (filme: Filme) => void;
  onDelete: (id: number) => void;
}

export function MovieCard({ filme, imageUrl, onEdit, onDelete }: Props) {
  const generos = ["", "Ação", "Comédia", "Drama", "Ficção Científica", "Terror"];
  const classificacoes = ["", "Livre", "10 anos", "12 anos", "14 anos", "16 anos", "18 anos"];

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card h-100 shadow card-filme">
        <img src={imageUrl} className="card-img-top img-card" alt={filme.title} />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title">{filme.title}</h5>
            <p className="card-text">{generos[filme.gender]} • {filme.duration} min</p>
            <p className="text-muted">{classificacoes[filme.classification]}</p>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(filme.id)}>
              <i className="bi bi-trash-fill"></i>
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => onEdit(filme)}>
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
