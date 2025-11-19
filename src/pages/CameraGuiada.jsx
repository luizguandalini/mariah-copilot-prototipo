import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLaudo } from '../contexts/LaudoContext';
import { Camera, ArrowLeft, Check, AlertCircle, X } from 'lucide-react';
import './CameraGuiada.css';

// Roteiro de fotos por ambiente
const AMBIENTES_ROTEIRO = [
  {
    nome: 'Fachada',
    instrucoes: [
      { texto: 'Tire uma foto da fachada completa do imóvel', tipo: 'obrigatoria', key: 'fachada_completa' },
      { texto: 'Tire uma foto da porta de entrada', tipo: 'obrigatoria', key: 'porta_entrada' },
      { texto: 'Existe avaria na porta?', tipo: 'condicional', key: 'porta_avaria', fotoTexto: 'Tire uma foto focada na avaria' }
    ]
  },
  {
    nome: 'Sala',
    instrucoes: [
      { texto: 'Tire uma foto geral da sala', tipo: 'obrigatoria', key: 'sala_geral' },
      { texto: 'Tire uma foto das janelas', tipo: 'obrigatoria', key: 'sala_janelas' },
      { texto: 'Tire uma foto do piso', tipo: 'obrigatoria', key: 'sala_piso' },
      { texto: 'Tire uma foto do teto e iluminação', tipo: 'obrigatoria', key: 'sala_teto' },
      { texto: 'Existe avaria nas paredes?', tipo: 'condicional', key: 'sala_avaria', fotoTexto: 'Tire fotos das avarias' }
    ]
  },
  {
    nome: 'Cozinha',
    instrucoes: [
      { texto: 'Tire uma foto geral da cozinha', tipo: 'obrigatoria', key: 'cozinha_geral' },
      { texto: 'Tire uma foto da pia e bancada', tipo: 'obrigatoria', key: 'cozinha_pia' },
      { texto: 'Tire uma foto dos armários', tipo: 'obrigatoria', key: 'cozinha_armarios' },
      { texto: 'Tire uma foto do fogão/cooktop', tipo: 'obrigatoria', key: 'cozinha_fogao' },
      { texto: 'Existe avaria?', tipo: 'condicional', key: 'cozinha_avaria', fotoTexto: 'Tire fotos das avarias' }
    ]
  },
  {
    nome: 'Banheiro',
    instrucoes: [
      { texto: 'Tire uma foto geral do banheiro', tipo: 'obrigatoria', key: 'banheiro_geral' },
      { texto: 'Tire uma foto da pia e espelho', tipo: 'obrigatoria', key: 'banheiro_pia' },
      { texto: 'Tire uma foto do vaso sanitário', tipo: 'obrigatoria', key: 'banheiro_vaso' },
      { texto: 'Tire uma foto do box/chuveiro', tipo: 'obrigatoria', key: 'banheiro_box' },
      { texto: 'Existe avaria?', tipo: 'condicional', key: 'banheiro_avaria', fotoTexto: 'Tire fotos das avarias' }
    ]
  },
  {
    nome: 'Quarto',
    instrucoes: [
      { texto: 'Tire uma foto geral do quarto', tipo: 'obrigatoria', key: 'quarto_geral' },
      { texto: 'Tire uma foto do armário embutido', tipo: 'obrigatoria', key: 'quarto_armario' },
      { texto: 'Tire uma foto das janelas', tipo: 'obrigatoria', key: 'quarto_janelas' },
      { texto: 'Tire uma foto do piso', tipo: 'obrigatoria', key: 'quarto_piso' },
      { texto: 'Existe avaria?', tipo: 'condicional', key: 'quarto_avaria', fotoTexto: 'Tire fotos das avarias' }
    ]
  }
];

const CameraGuiada = () => {
  const { laudoId } = useParams();
  const navigate = useNavigate();
  const { addAmbiente, addFotoToAmbiente, laudos } = useLaudo();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [ambienteAtualIndex, setAmbienteAtualIndex] = useState(0);
  const [instrucaoAtualIndex, setInstrucaoAtualIndex] = useState(0);
  const [fotosAmbiente, setFotosAmbiente] = useState([]);
  const [aguardandoResposta, setAguardandoResposta] = useState(false);
  const [cameraAtiva, setCameraAtiva] = useState(false);
  const [fotoCapturada, setFotoCapturada] = useState(null);
  const [erro, setErro] = useState(null);

  const ambienteAtual = AMBIENTES_ROTEIRO[ambienteAtualIndex];
  const instrucaoAtual = ambienteAtual?.instrucoes[instrucaoAtualIndex];
  const laudo = laudos.find(l => l.id === laudoId);

  // Limpa o stream da câmera ao desmontar
  useEffect(() => {
    return () => {
      pararCamera();
    };
  }, []);

  // Inicia a câmera automaticamente quando não for pergunta condicional
  useEffect(() => {
    if (instrucaoAtual?.tipo === 'obrigatoria' && !cameraAtiva && !fotoCapturada) {
      iniciarCamera();
    }
  }, [instrucaoAtualIndex, ambienteAtualIndex]);

  const iniciarCamera = async () => {
    try {
      setErro(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Câmera traseira
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        streamRef.current = stream;
        setCameraAtiva(true);
      }
    } catch (err) {
      console.error('Erro ao acessar câmera:', err);
      setErro('Não foi possível acessar a câmera. Verifique as permissões.');
    }
  };

  const pararCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraAtiva(false);
  };

  const capturarFoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const fotoData = {
        id: Date.now().toString(),
        url: url,
        blob: blob,
        timestamp: new Date().toISOString(),
        instrucao: instrucaoAtual.fotoTexto || instrucaoAtual.texto,
        tipo: instrucaoAtual.tipo,
        key: instrucaoAtual.key
      };
      setFotoCapturada(fotoData);
      pararCamera();
    }, 'image/jpeg', 0.9);
  };

  const confirmarFoto = () => {
    if (fotoCapturada) {
      setFotosAmbiente([...fotosAmbiente, fotoCapturada]);
      setFotoCapturada(null);

      // Se for condicional e ainda tiver aguardando resposta, volta pra pergunta
      if (aguardandoResposta) {
        setAguardandoResposta(false);
        proximaInstrucao();
      } else {
        proximaInstrucao();
      }
    }
  };

  const refazerFoto = () => {
    if (fotoCapturada?.url) {
      URL.revokeObjectURL(fotoCapturada.url);
    }
    setFotoCapturada(null);
    iniciarCamera();
  };

  const proximaInstrucao = () => {
    if (instrucaoAtualIndex < ambienteAtual.instrucoes.length - 1) {
      setInstrucaoAtualIndex(instrucaoAtualIndex + 1);
      setAguardandoResposta(false);
    } else {
      finalizarAmbiente();
    }
  };

  const responderCondicional = (resposta) => {
    if (resposta === 'sim') {
      setAguardandoResposta(true);
      iniciarCamera();
    } else {
      proximaInstrucao();
    }
  };

  const finalizarAmbiente = () => {
    // Salva as fotos do ambiente atual
    const ambienteData = {
      nome: ambienteAtual.nome,
      fotos: fotosAmbiente,
      completedAt: new Date().toISOString()
    };

    addAmbiente(laudoId, ambienteData);

    // Reseta o estado para o próximo ambiente
    setFotosAmbiente([]);
    setInstrucaoAtualIndex(0);
    setAguardandoResposta(false);
    setFotoCapturada(null);
    pararCamera();

    if (ambienteAtualIndex < AMBIENTES_ROTEIRO.length - 1) {
      setAmbienteAtualIndex(ambienteAtualIndex + 1);
    } else {
      // Finaliza o laudo
      navigate(`/laudo/${laudoId}`);
    }
  };

  const pularAmbiente = () => {
    if (window.confirm(`Deseja pular o ambiente "${ambienteAtual.nome}"?`)) {
      pararCamera();
      setFotosAmbiente([]);
      setInstrucaoAtualIndex(0);
      setAguardandoResposta(false);
      setFotoCapturada(null);

      if (ambienteAtualIndex < AMBIENTES_ROTEIRO.length - 1) {
        setAmbienteAtualIndex(ambienteAtualIndex + 1);
      } else {
        navigate(`/laudo/${laudoId}`);
      }
    }
  };

  const progressoAmbiente = ((instrucaoAtualIndex + 1) / ambienteAtual?.instrucoes.length) * 100;
  const progressoGeral = ((ambienteAtualIndex / AMBIENTES_ROTEIRO.length) * 100);

  const mostrarPerguntaCondicional = instrucaoAtual?.tipo === 'condicional' && !aguardandoResposta;

  return (
    <div className="camera-container">
      <header className="camera-header">
        <button onClick={() => {
          pararCamera();
          navigate(`/laudo/${laudoId}`);
        }} className="btn-back">
          <ArrowLeft size={24} />
        </button>
        <div className="header-info">
          <h2>{ambienteAtual?.nome}</h2>
          <p>Ambiente {ambienteAtualIndex + 1} de {AMBIENTES_ROTEIRO.length}</p>
        </div>
        <button onClick={pularAmbiente} className="btn-skip">
          Pular
        </button>
      </header>

      <div className="progress-bars">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressoGeral}%` }}></div>
        </div>
        <span className="progress-label">Progresso geral</span>
      </div>

      <div className="camera-view">
        {erro && (
          <div className="camera-error">
            <AlertCircle size={48} />
            <p>{erro}</p>
            <button onClick={iniciarCamera} className="btn-retry">
              Tentar Novamente
            </button>
          </div>
        )}

        {!erro && cameraAtiva && !fotoCapturada && (
          <div className="camera-active">
            <video ref={videoRef} autoPlay playsInline className="camera-video" />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
        )}

        {fotoCapturada && (
          <div className="foto-preview">
            <img src={fotoCapturada.url} alt="Foto capturada" />
          </div>
        )}

        {!cameraAtiva && !fotoCapturada && !erro && mostrarPerguntaCondicional && (
          <div className="camera-placeholder">
            <Camera size={64} strokeWidth={1.5} />
            <p>Aguardando resposta...</p>
          </div>
        )}
      </div>

      <div className="instrucoes-panel">
        <div className="instrucao-card">
          <div className="instrucao-icon">
            {instrucaoAtual?.tipo === 'condicional' ? (
              <AlertCircle size={24} />
            ) : (
              <Camera size={24} />
            )}
          </div>
          <div className="instrucao-content">
            <h3>{aguardandoResposta ? instrucaoAtual?.fotoTexto : instrucaoAtual?.texto}</h3>

            {mostrarPerguntaCondicional && (
              <div className="condicional-buttons">
                <button onClick={() => responderCondicional('sim')} className="btn-condicional btn-sim">
                  Sim, existe
                </button>
                <button onClick={() => responderCondicional('nao')} className="btn-condicional btn-nao">
                  Não existe
                </button>
              </div>
            )}
          </div>
        </div>

        {fotosAmbiente.length > 0 && (
          <div className="fotos-coletadas">
            <p className="fotos-count">{fotosAmbiente.length} {fotosAmbiente.length === 1 ? 'foto tirada' : 'fotos tiradas'} neste ambiente</p>
            <div className="fotos-grid">
              {fotosAmbiente.map((foto, index) => (
                <div key={foto.id} className="foto-thumb">
                  <img src={foto.url} alt={`Foto ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {fotoCapturada && (
          <div className="foto-actions">
            <button onClick={refazerFoto} className="btn-action btn-refazer">
              <X size={20} />
              Refazer
            </button>
            <button onClick={confirmarFoto} className="btn-action btn-confirmar">
              <Check size={20} />
              Próxima
            </button>
          </div>
        )}

        {cameraAtiva && !fotoCapturada && !mostrarPerguntaCondicional && (
          <button onClick={capturarFoto} className="btn-capturar">
            <Camera size={24} />
            Capturar Foto
          </button>
        )}
      </div>
    </div>
  );
};

export default CameraGuiada;
