import { useEffect, useState, useCallback } from 'react';
import { Filme } from '../../models/Filme';
import { getAllFilmes, saveFilmes, buscarImagem } from '../../services/filmeService';
import { MovieCard } from '../../components/MovieCard';
import { MovieModal } from '../../components/MovieModal';
import { ConfirmationModal } from '../../components/ConfirmationModal';

export function Filmes() {
    const [filmes, setFilmes] = useState<Filme[]>([]);
    const [imagens, setImagens] = useState<Record<number, string>>({});
    const [showModal, setShowModal] = useState(false);
    const [filmeEdit, setFilmeEdit] = useState<Filme | null>(null);
    const [idParaExcluir, setIdParaExcluir] = useState<number | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const loadFilmesAndImages = useCallback(() => {
        const lista = getAllFilmes();
        setFilmes(lista);
        
        setImagens({}); 
        
        lista.forEach(filme => {
            buscarImagem(filme.title).then(url => {
                setImagens(prev => ({ ...prev, [filme.id]: url }));
            }).catch(error => {
                console.error(`Erro ao buscar imagem para ${filme.title}:`, error);
                setImagens(prev => ({ ...prev, [filme.id]: "/images/notFound.png" }));
            });
        });
    }, []);

    useEffect(() => {
        loadFilmesAndImages();
    }, [loadFilmesAndImages]);

    const openModal = (filme?: Filme) => {
        setFilmeEdit(filme ?? null);
        setShowModal(true);
    };

    const handleSave = (filme: Filme) => {
        const filmeComId = filmeEdit
            ? filme
            : { ...filme, id: filmes.length > 0 ? Math.max(...filmes.map(f => f.id)) + 1 : 1 };

        const novaLista = filmeEdit
            ? filmes.map(f => (f.id === filme.id ? filmeComId : f))
            : [...filmes, filmeComId];
        
        saveFilmes(novaLista);
        loadFilmesAndImages();
        setShowModal(false);
    };

    const confirmarExclusao = () => {
        if (idParaExcluir != null) {
            const novaLista = filmes.filter(f => f.id !== idParaExcluir);
            saveFilmes(novaLista);
            loadFilmesAndImages();
            setShowConfirm(false);
        }
    };

    const handleEdit = (filme: Filme) => openModal(filme);

    const handleDelete = (id: number) => {
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
                                onDelete={handleDelete}
                                onEdit={handleEdit}
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