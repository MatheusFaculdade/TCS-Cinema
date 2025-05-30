import { useEffect, useState } from 'react';
import { Filme } from '../../models/Filme';
import { getAllFilmes, saveFilmes, buscarImagem } from '../../services/filmeService';
import { MovieCard } from '../../components/MovieCard';
import { MovieModal } from '../../components/MovieModal'
import { ConfirmationModal } from '../../components/ConfirmationModal'


export function Filmes() {
    const [filmes, setFilmes] = useState<Filme[]>([]);
    const [imagens, setImagens] = useState<Record<number, string>>({});
    const [showModal, setShowModal] = useState(false)
    const [filmeEdit, setFilmeEdit] = useState<Filme | null>(null)
    const [idParaExcluir, setIdParaExcluir] = useState<number | null>(null)
    const [showConfirm, setShowConfirm] = useState(false)

    const openModal = (filme?: Filme) => {
    setFilmeEdit(filme ?? null)
    setShowModal(true)
    }

    const handleSave = (filme: Filme) => {
    const novaLista = filmeEdit
        ? filmes.map(f => (f.id === filme.id ? filme : f))
        : [...filmes, filme]
    setFilmes(novaLista)
    saveFilmes(novaLista)
    }

    const confirmarExclusao = () => {
    if (idParaExcluir != null) {
        const novaLista = filmes.filter(f => f.id !== idParaExcluir)
        setFilmes(novaLista)
        saveFilmes(novaLista)
        setShowConfirm(false)
    }
    }

  useEffect(() => {
    const lista = getAllFilmes();
    setFilmes(lista);
    lista.forEach(filme => {
      buscarImagem(filme.title).then(url => {
        setImagens(prev => ({ ...prev, [filme.id]: url }));
      });
    });
  }, []);

    const handleEdit = (filme: Filme) => openModal(filme)

    const handleDelete = (id: number) => {
    setIdParaExcluir(id)
    setShowConfirm(true)
    }


  return (
    <div className="container mt-4">
      <h3>Filmes</h3>
      <hr />
      <div className="mb-3 text-end">
        <button className="btn btn-success" onClick={() => openModal()}>Adicionar Filme</button>
      </div>
      <div className="row g-4">
        {filmes.map(filme => (
          <MovieCard
            key={filme.id}
            filme={filme}
            onDelete={handleDelete}
            onEdit={handleEdit}
            imageUrl={imagens[filme.id] || "/images/notFound.png"}
          />
        ))}
      </div>
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
