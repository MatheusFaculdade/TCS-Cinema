import { useEffect, useState, useCallback } from 'react';
import { Filme } from '../../models/Filme';
import { movieService } from '../../services/filmeService';
import { MovieCard } from '../../components/MovieCard';
import { MovieModal } from '../../components/MovieModal';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import toast from 'react-hot-toast';

export function Filmes() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [imagens, setImagens] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [filmeEdit, setFilmeEdit] = useState<Filme | null>(null);
  const [idParaExcluir, setIdParaExcluir] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const loadFilmesAndImages = useCallback(async () => {
    try {
      const lista = await movieService.getAll();
      setFilmes(lista);
      setImagens({});

      for (const filme of lista) {
        try {
          const url = await movieService.buscarImagem(filme.title);
          setImagens(prev => ({ ...prev, [filme.id]: url }));
        } catch (error) {
          console.error(`Erro ao buscar imagem para ${filme.title}:`, error);
          setImagens(prev => ({ ...prev, [filme.id]: "/images/notFound.png" }));
        }
      }
    } catch (err) {
      console.error("Erro ao carregar filmes:", err);
    }
  }, []);

  useEffect(() => {
    loadFilmesAndImages();
  }, [loadFilmesAndImages]);

  const openModal = (filme?: Filme) => {
    setFilmeEdit(filme ?? null);
    setShowModal(true);
  };

  const handleSave = async (filme: Filme) => {
    try {
      if (filmeEdit) {
        await movieService.update(filme.id, filme);
      } else {
        await movieService.create(filme);
      }
      setShowModal(false);
      await loadFilmesAndImages();
      toast.success('Filme salvo com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar filme. Tente novamente mais tarde.');
      console.error("Erro ao salvar filme:", error);
    }
  };

  const confirmarExclusao = async () => {
    if (idParaExcluir) {
      try {
        await movieService.delete(idParaExcluir);
        await loadFilmesAndImages();
        toast.success('Excluído!');
      } catch (error) {
        toast.error("Erro ao excluir filme. Já possui sessões relacionadas a este filme.");
        console.error("Erro ao excluir filme:", error);
      } finally {
        setShowConfirm(false);
      }
    }
  };

  const handleEdit = (filme: Filme) => openModal(filme);

  const handleDelete = (id: string) => {
    setIdParaExcluir(id);
    setShowConfirm(true);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Nossa Biblioteca de Filmes</h2>
        <button
          className="btn btn-success btn-lg shadow-sm"
          onClick={() => openModal()}
        >
          <i className="bi bi-plus-circle me-2"></i> Adicionar Novo Filme
        </button>
      </div>
      <hr className="my-4" />
      {filmes.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Nenhum filme encontrado. Que tal adicionar um novo?
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {filmes.map(filme => (
            <div className="col" key={filme.id}>
              <MovieCard
                filme={filme}
                onDelete={() => handleDelete(filme.id)}
                onEdit={() => handleEdit(filme)}
                imageUrl={imagens[filme.id] || "/images/notFound.png"}
              />
            </div>
          ))}
        </div>
      )}

      <MovieModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        filmeParaEditar={filmeEdit}
      />

      <ConfirmationModal
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmarExclusao}
        message="Tem certeza que deseja excluir este filme?"
      />
    </div>
  );
}
