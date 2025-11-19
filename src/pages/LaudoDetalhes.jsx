import { useParams, useNavigate } from 'react-router-dom';
import { useLaudo } from '../contexts/LaudoContext';
import { ArrowLeft, Camera, Send, Trash2, Image, MapPin, Calendar } from 'lucide-react';
import './LaudoDetalhes.css';

const LaudoDetalhes = () => {
  const { laudoId } = useParams();
  const navigate = useNavigate();
  const { laudos, deleteLaudo } = useLaudo();

  const laudo = laudos.find(l => l.id === laudoId);

  if (!laudo) {
    return (
      <div className="not-found">
        <h2>Laudo não encontrado</h2>
        <button onClick={() => navigate('/home')}>Voltar para Home</button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este laudo?')) {
      deleteLaudo(laudoId);
      navigate('/home');
    }
  };

  const handleContinueCamera = () => {
    navigate(`/laudo/${laudoId}/camera`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalFotos = laudo.ambientes?.reduce((acc, amb) => acc + (amb.fotos?.length || 0), 0) || 0;

  return (
    <div className="laudo-detalhes-container">
      <header className="laudo-detalhes-header">
        <button onClick={() => navigate('/home')} className="btn-back">
          <ArrowLeft size={24} />
        </button>
        <h1>Detalhes do Laudo</h1>
        <button onClick={handleDelete} className="btn-delete-header">
          <Trash2 size={20} />
        </button>
      </header>

      <div className="laudo-detalhes-content">
        <div className="laudo-info-card">
          <div className="info-header">
            <h2>{laudo.tipo || 'Laudo Imobiliário'}</h2>
            <span className={`status-badge ${laudo.status === 'concluido' ? 'status-completed' : 'status-progress'}`}>
              {laudo.status === 'concluido' ? 'Concluído' : 'Em andamento'}
            </span>
          </div>

          <div className="info-row">
            <MapPin size={18} />
            <div>
              <p className="info-label">Endereço</p>
              <p className="info-value">{laudo.endereco}</p>
              <p className="info-value-small">CEP: {laudo.cep}</p>
            </div>
          </div>

          <div className="info-row">
            <Calendar size={18} />
            <div>
              <p className="info-label">Criado em</p>
              <p className="info-value">{formatDate(laudo.createdAt)}</p>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <p className="info-label">Uso</p>
              <p className="info-value">{laudo.uso}</p>
            </div>
            <div className="info-item">
              <p className="info-label">Tamanho</p>
              <p className="info-value">{laudo.tamanho}m²</p>
            </div>
            <div className="info-item">
              <p className="info-label">Mobília</p>
              <p className="info-value">{laudo.mobilia}</p>
            </div>
            <div className="info-item">
              <p className="info-label">Vistoria</p>
              <p className="info-value">{laudo.tipoVistoria}</p>
            </div>
          </div>
        </div>

        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon">
              <Image size={24} />
            </div>
            <div className="stat-info">
              <p className="stat-value">{totalFotos}</p>
              <p className="stat-label">Fotos capturadas</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Camera size={24} />
            </div>
            <div className="stat-info">
              <p className="stat-value">{laudo.ambientes?.length || 0}</p>
              <p className="stat-label">Ambientes vistoriados</p>
            </div>
          </div>
        </div>

        <div className="ambientes-section">
          <h3>Ambientes</h3>

          {!laudo.ambientes || laudo.ambientes.length === 0 ? (
            <div className="empty-ambientes">
              <Camera size={48} strokeWidth={1} />
              <p>Nenhum ambiente vistoriado ainda</p>
              <button onClick={handleContinueCamera} className="btn-start-camera">
                Iniciar Vistoria
              </button>
            </div>
          ) : (
            <>
              {laudo.ambientes.map((ambiente) => (
                <div key={ambiente.id} className="ambiente-card">
                  <div className="ambiente-header">
                    <h4>{ambiente.nome}</h4>
                    <span className="fotos-badge">
                      {ambiente.fotos?.length || 0} {ambiente.fotos?.length === 1 ? 'foto' : 'fotos'}
                    </span>
                  </div>

                  {ambiente.fotos && ambiente.fotos.length > 0 && (
                    <div className="ambiente-fotos-grid">
                      {ambiente.fotos.map((foto) => (
                        <div key={foto.id} className="foto-item">
                          <img src={foto.url} alt={foto.instrucao} />
                          <p className="foto-caption">{foto.instrucao}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <button onClick={handleContinueCamera} className="btn-continue-camera">
                <Camera size={20} />
                Continuar Vistoria
              </button>
            </>
          )}
        </div>

        <div className="actions-section">
          <button className="btn-export" onClick={() => alert('Enviando para Mariah... (funcionalidade em desenvolvimento)')}>
            <Send size={20} />
            Enviar para Mariah
          </button>

          <button onClick={handleDelete} className="btn-delete">
            <Trash2 size={20} />
            Excluir Laudo
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaudoDetalhes;
