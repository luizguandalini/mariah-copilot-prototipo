import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLaudo } from '../contexts/LaudoContext';
import { ArrowLeft, Home } from 'lucide-react';
import './NewLaudo.css';

const NewLaudo = () => {
  const navigate = useNavigate();
  const { createLaudo } = useLaudo();
  const [formData, setFormData] = useState({
    uso: '',
    tamanho: '',
    tipo: '',
    mobilia: '',
    realizada: '',
    agua: '',
    tipoVistoria: '',
    energia: '',
    endereco: '',
    pinturaNova: '',
    cep: '',
    faxinado: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLaudo = createLaudo(formData);
    navigate(`/laudo/${newLaudo.id}/camera`);
  };

  return (
    <div className="new-laudo-container">
      <header className="new-laudo-header">
        <button onClick={() => navigate('/home')} className="btn-back">
          <ArrowLeft size={24} />
        </button>
        <h1>Novo Laudo</h1>
        <div style={{ width: 24 }}></div>
      </header>

      <div className="new-laudo-content">
        <div className="form-intro">
          <div className="intro-icon">
            <Home size={32} />
          </div>
          <h2>Informações do Imóvel</h2>
          <p>Preencha os dados básicos do imóvel para iniciar o laudo</p>
        </div>

        <form onSubmit={handleSubmit} className="laudo-form">
          <div className="form-row">
            <div className="form-group">
              <label>Uso</label>
              <input
                type="text"
                name="uso"
                placeholder="Ex: Residencial"
                value={formData.uso}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Tamanho (m²)</label>
              <input
                type="text"
                name="tamanho"
                placeholder="Ex: 141"
                value={formData.tamanho}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Tipo de Imóvel</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="apartamento">Apartamento</option>
              <option value="casa">Casa</option>
              <option value="sobrado">Sobrado</option>
              <option value="comercial">Comercial</option>
            </select>
          </div>

          <div className="form-group">
            <label>Mobília</label>
            <select
              name="mobilia"
              value={formData.mobilia}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="mobiliado">Mobiliado</option>
              <option value="semi-mobiliado">Semi-mobiliado</option>
              <option value="nao-mobiliado">Não mobiliado</option>
            </select>
          </div>

          <div className="form-group">
            <label>Endereço</label>
            <input
              type="text"
              name="endereco"
              placeholder="Ex: R. David Ben Gurion, 95"
              value={formData.endereco}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>CEP</label>
            <input
              type="text"
              name="cep"
              placeholder="Ex: 05634-001"
              value={formData.cep}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Água</label>
              <select
                name="agua"
                value={formData.agua}
                onChange={handleChange}
                required
              >
                <option value="">Selecione...</option>
                <option value="sim">Disponível</option>
                <option value="nao">Não disponível</option>
              </select>
            </div>

            <div className="form-group">
              <label>Energia</label>
              <select
                name="energia"
                value={formData.energia}
                onChange={handleChange}
                required
              >
                <option value="">Selecione...</option>
                <option value="sim">Disponível</option>
                <option value="nao">Não disponível</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Tipo de Vistoria</label>
            <select
              name="tipoVistoria"
              value={formData.tipoVistoria}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
              <option value="periodica">Periódica</option>
            </select>
          </div>

          <div className="form-group">
            <label>Data da Vistoria</label>
            <input
              type="datetime-local"
              name="realizada"
              value={formData.realizada}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            Iniciar Vistoria
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewLaudo;
