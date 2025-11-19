import { createContext, useContext, useState, useEffect } from 'react';

const LaudoContext = createContext();

export const useLaudo = () => {
  const context = useContext(LaudoContext);
  if (!context) {
    throw new Error('useLaudo must be used within LaudoProvider');
  }
  return context;
};

export const LaudoProvider = ({ children }) => {
  const [laudos, setLaudos] = useState([]);
  const [currentLaudo, setCurrentLaudo] = useState(null);

  useEffect(() => {
    // Carrega laudos do localStorage
    const storedLaudos = localStorage.getItem('mariah_laudos');
    if (storedLaudos) {
      setLaudos(JSON.parse(storedLaudos));
    }
  }, []);

  const createLaudo = (laudoData) => {
    const newLaudo = {
      id: Date.now().toString(),
      ...laudoData,
      createdAt: new Date().toISOString(),
      ambientes: [],
      status: 'em_andamento'
    };
    const updatedLaudos = [...laudos, newLaudo];
    setLaudos(updatedLaudos);
    localStorage.setItem('mariah_laudos', JSON.stringify(updatedLaudos));
    setCurrentLaudo(newLaudo);
    return newLaudo;
  };

  const updateLaudo = (laudoId, updates) => {
    const updatedLaudos = laudos.map(laudo =>
      laudo.id === laudoId ? { ...laudo, ...updates } : laudo
    );
    setLaudos(updatedLaudos);
    localStorage.setItem('mariah_laudos', JSON.stringify(updatedLaudos));
    if (currentLaudo?.id === laudoId) {
      setCurrentLaudo({ ...currentLaudo, ...updates });
    }
  };

  const deleteLaudo = (laudoId) => {
    const updatedLaudos = laudos.filter(laudo => laudo.id !== laudoId);
    setLaudos(updatedLaudos);
    localStorage.setItem('mariah_laudos', JSON.stringify(updatedLaudos));
    if (currentLaudo?.id === laudoId) {
      setCurrentLaudo(null);
    }
  };

  const addAmbiente = (laudoId, ambiente) => {
    const laudo = laudos.find(l => l.id === laudoId);
    if (laudo) {
      const newAmbiente = {
        id: Date.now().toString(),
        ...ambiente,
        fotos: []
      };
      const updatedAmbientes = [...(laudo.ambientes || []), newAmbiente];
      updateLaudo(laudoId, { ambientes: updatedAmbientes });
      return newAmbiente;
    }
  };

  const addFotoToAmbiente = (laudoId, ambienteId, foto) => {
    const laudo = laudos.find(l => l.id === laudoId);
    if (laudo) {
      const updatedAmbientes = laudo.ambientes.map(amb => {
        if (amb.id === ambienteId) {
          return {
            ...amb,
            fotos: [...(amb.fotos || []), foto]
          };
        }
        return amb;
      });
      updateLaudo(laudoId, { ambientes: updatedAmbientes });
    }
  };

  const value = {
    laudos,
    currentLaudo,
    setCurrentLaudo,
    createLaudo,
    updateLaudo,
    deleteLaudo,
    addAmbiente,
    addFotoToAmbiente
  };

  return <LaudoContext.Provider value={value}>{children}</LaudoContext.Provider>;
};
