import './style.css';
import { Filme } from '../../models/Filme';
import { Button } from '../common/Button'; 

interface Props {
  filme: Filme;
  imageUrl: string;
  onEdit: (filme: Filme) => void;
  onDelete: (id: string) => void;
}

export function MovieCard({ filme, imageUrl, onEdit, onDelete }: Props) {
  const generos: Record<number, string> = {
    1: "Ação",
    2: "Comédia",
    3: "Drama",
    4: "Ficção Científica",
    5: "Terror"
  };
  const classificacoes: Record<number, string> = {
    1: "Livre",
    2: "10 anos",
    3: "12 anos",
    4: "14 anos",
    5: "16 anos",
    6: "18 anos"
  };

  return (
    <div className="card h-100 shadow-lg border-0 rounded-4 movie-card-custom"> 
      <img
        src={imageUrl}
        className="card-img-top movie-card-img-top rounded-top-4" 
        alt={filme.title}
        onError={(e) => (e.currentTarget.src = "/images/notFound.png")} 
      />
      <div className=""> 
        <div>
          <h5 className="card-title text-truncate fw-bold mb-2">{filme.title}</h5> 
          <p className="card-text text-secondary mb-1">
            {generos[filme.gender] || 'Não informado'} 
          </p>
          <p className="card-text text-muted mb-1">
            {filme.duration} min 
          </p>
          <span className={`badge ${filme.classification === 1 ? 'bg-success' : 'bg-warning text-dark'} text-uppercase mt-2`}>
            {classificacoes[filme.classification] || 'Não classificado'}
          </span>
        </div>
        <div className="d-flex justify-content-center gap-3 mt-4"> 
          <Button
            text=""
            variant="outline-danger" 
            size="md" 
            icone="trash-fill"
            onClick={() => onDelete(filme.id)}
          />
          <Button
            text="Editar"
            variant="primary" 
            size="md"
            icone="pencil-fill"
            onClick={() => onEdit(filme)}
          />
        </div>
      </div>
    </div>
  );
}