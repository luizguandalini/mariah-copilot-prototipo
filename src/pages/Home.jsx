import { useAuth } from '../contexts/AuthContext';
import { useLaudo } from '../contexts/LaudoContext';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, LogOut, User } from 'lucide-react';
import './Home.css';

const Home = () => {
  const { user, logout } = useAuth();
  const { laudos } = useLaudo();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNewLaudo = () => {
    navigate('/new-laudo');
  };

  const handleViewLaudo = (laudoId) => {
    navigate(`/laudo/${laudoId}`);
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

  const getStatusBadge = (status) => {
    const badges = {
      em_andamento: { text: 'Em andamento', class: 'status-progress' },
      concluido: { text: 'Concluído', class: 'status-completed' },
      rascunho: { text: 'Rascunho', class: 'status-draft' }
    };
    return badges[status] || badges.rascunho;
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-top">
          <div className="user-info">
            <div className="user-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <User size={24} />
              )}
            </div>
            <div className="user-details">
              <h3>Olá, {user?.name?.split(' ')[0] || 'Usuário'}!</h3>
              <p>{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            <LogOut size={20} />
          </button>
        </div>

        <div className="header-title">
          <h1>Meus Laudos</h1>
          <p>Gerencie seus laudos imobiliários</p>
        </div>
      </header>

      <div className="home-content">
        <button onClick={handleNewLaudo} className="btn-new-laudo">
          <Plus size={24} />
          Criar Novo Laudo
        </button>

        <div className="laudos-list">
          {laudos.length === 0 ? (
            <div className="empty-state">
              <FileText size={64} strokeWidth={1} />
              <h3>Nenhum laudo cadastrado</h3>
              <p>Comece criando seu primeiro laudo imobiliário</p>
            </div>
          ) : (
            laudos.map(laudo => (
              <div
                key={laudo.id}
                className="laudo-card"
                onClick={() => handleViewLaudo(laudo.id)}
              >
                <div className="laudo-card-header">
                  <FileText size={24} />
                  <span className={`status-badge ${getStatusBadge(laudo.status).class}`}>
                    {getStatusBadge(laudo.status).text}
                  </span>
                </div>
                <div className="laudo-card-body">
                  <h3>{laudo.tipo || 'Laudo Imobiliário'}</h3>
                  <p className="laudo-address">
                    {laudo.endereco || 'Endereço não informado'}
                  </p>
                  <div className="laudo-meta">
                    <span className="laudo-date">{formatDate(laudo.createdAt)}</span>
                    <span className="laudo-ambientes">
                      {laudo.ambientes?.length || 0} {laudo.ambientes?.length === 1 ? 'ambiente' : 'ambientes'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
