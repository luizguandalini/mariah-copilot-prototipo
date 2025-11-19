# 🏠 Mariah Copilot - Protótipo

> Aplicativo mobile inteligente para criação de laudos imobiliários com assistente guiado por câmera

[![Tecnologia](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Framework](https://img.shields.io/badge/Vite-5-purple.svg)](https://vitejs.dev/)
[![Status](https://img.shields.io/badge/Status-Protótipo-orange.svg)]()

## 📖 Sobre o Projeto

O **Mariah Copilot** é um protótipo de aplicativo mobile que revoluciona o processo de vistoria imobiliária. Através de um assistente inteligente, o aplicativo guia o usuário passo a passo, indicando exatamente quais fotos tirar em cada ambiente do imóvel.

### 🎯 Problema que Resolve

- ✅ Elimina esquecimento de fotos importantes
- ✅ Padroniza vistorias entre diferentes profissionais
- ✅ Reduz tempo de treinamento de novos colaboradores
- ✅ Organiza automaticamente fotos por ambiente
- ✅ Detecta e documenta avarias de forma sistemática

## ✨ Funcionalidades

### 🔐 Autenticação
- Login via Google (mock)
- Login via Apple (mock)
- Sistema de sessão persistente

### 📝 Gestão de Laudos
- Criar novos laudos com informações completas do imóvel
- Visualizar todos os laudos criados
- Editar informações básicas
- Excluir laudos

### 📸 Câmera Guiada Inteligente

**O grande diferencial do aplicativo!**

O sistema guia o usuário através de 5 ambientes principais:

#### 1. 🏘️ Fachada
- Foto da fachada completa
- Foto da porta de entrada
- Detecção de avarias

#### 2. 🛋️ Sala
- Foto geral do ambiente
- Foto das janelas
- Foto do piso
- Foto do teto e iluminação
- Detecção de avarias nas paredes

#### 3. 🍳 Cozinha
- Foto geral do ambiente
- Foto da pia e bancada
- Foto dos armários
- Foto do fogão/cooktop
- Detecção de avarias

#### 4. 🚿 Banheiro
- Foto geral do ambiente
- Foto da pia e espelho
- Foto do vaso sanitário
- Foto do box/chuveiro
- Detecção de avarias

#### 5. 🛏️ Quarto
- Foto geral do ambiente
- Foto do armário embutido
- Foto das janelas
- Foto do piso
- Detecção de avarias

### 🤖 Sistema de Perguntas Condicionais

Para cada ambiente, o sistema pergunta:
- "Existe avaria em [componente]?"
  - **Sim** → Abre a câmera para foto da avaria
  - **Não** → Pula para próxima instrução

### 📊 Visualização e Organização

- Fotos organizadas automaticamente por ambiente
- Contador de fotos por ambiente
- Preview de todas as fotos
- Status do laudo (em andamento/concluído)

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool ultra-rápido
- **React Router DOM** - Navegação entre páginas
- **Lucide React** - Biblioteca de ícones moderna
- **Navigator Media Devices API** - Acesso à câmera nativa
- **LocalStorage API** - Persistência de dados local
- **CSS3** - Estilização moderna e responsiva

## 🎨 Design System

Baseado na identidade visual da Mariah:

### Cores Principais
```css
--primary-purple: #8B5CF6
--primary-purple-dark: #7C3AED
--primary-purple-light: #A78BFA
--secondary-pink: #EC4899
--background-light: #F9FAFB
--text-dark: #1F2937
--text-gray: #6B7280
```

### Tipografia
- Sistema de fontes nativas (San Francisco, Segoe UI, Roboto)
- Hierarquia clara de títulos
- Ótima legibilidade em dispositivos móveis

## 📱 Interface Mobile-First

- Layout otimizado para celulares (max-width: 428px)
- Experiência fluida e intuitiva
- Animações suaves
- Feedback visual em todas as interações

## 🚀 Como Executar

### Pré-requisitos

```bash
Node.js 16+ instalado
npm ou yarn
```

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/mariah-copilot-app.git

# Entre no diretório
cd mariah-copilot-app

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev
```

### Acesso

- **Local**: http://localhost:5173
- **Rede**: http://SEU-IP:5173 (exemplo: http://192.168.1.100:5173)

## 📱 Testando no Celular

1. Certifique-se que o celular está na **mesma rede Wi-Fi**
2. Execute `npm run dev` no computador
3. Acesse o endereço de rede mostrado no terminal
4. Permita o acesso à câmera quando solicitado

**Leia mais**: [COMO-ACESSAR-NO-CELULAR.md](./COMO-ACESSAR-NO-CELULAR.md)

## 🌐 Deploy

### Vercel (Recomendado)

```bash
# Via Vercel CLI
npm i -g vercel
vercel
```

Ou conecte o repositório GitHub diretamente na interface da Vercel.

**Leia mais**: [DEPLOY-VERCEL.md](./DEPLOY-VERCEL.md)

## 📂 Estrutura do Projeto

```
mariah-copilot-app/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   ├── contexts/            # Context API (Auth e Laudo)
│   │   ├── AuthContext.jsx
│   │   └── LaudoContext.jsx
│   ├── pages/               # Páginas da aplicação
│   │   ├── Login.jsx        # Tela de login
│   │   ├── Home.jsx         # Lista de laudos
│   │   ├── NewLaudo.jsx     # Formulário novo laudo
│   │   ├── LaudoDetalhes.jsx # Visualização do laudo
│   │   └── CameraGuiada.jsx # Sistema de câmera guiada
│   ├── App.jsx              # Componente raiz
│   ├── main.jsx             # Ponto de entrada
│   └── index.css            # Estilos globais
├── public/                  # Arquivos públicos
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🔐 Segurança e Privacidade

- ✅ Todos os dados são armazenados localmente no navegador
- ✅ Nenhuma informação é enviada para servidores externos
- ✅ Fotos ficam apenas no dispositivo do usuário
- ✅ Autenticação é simulada (mock) para protótipo

## ⚠️ Limitações do Protótipo

Este é um **protótipo visual/funcional**, portanto:

- ❌ Não possui backend real
- ❌ Não gera PDF real
- ❌ Dados são perdidos ao limpar cache do navegador
- ❌ Autenticação é simulada (não valida credenciais reais)
- ❌ Não envia dados para a plataforma Mariah

## 🔮 Roadmap (Próximas Versões)

### Fase 2 - MVP
- [ ] Backend real (Node.js + Express ou Firebase)
- [ ] Autenticação OAuth real
- [ ] Upload de fotos para servidor
- [ ] Geração de PDF real
- [ ] Sincronização cloud

### Fase 3 - Produção
- [ ] App nativo (React Native ou Capacitor)
- [ ] Modo offline completo
- [ ] IA para detecção automática de avarias
- [ ] OCR para leitura de medidores
- [ ] Assinatura digital
- [ ] Integração com API da Mariah

## 👥 Equipe

Desenvolvido como protótipo para demonstração ao cliente.

## 📄 Licença

Protótipo proprietário - Mariah

## 📞 Contato

Para dúvidas ou sugestões sobre o protótipo, entre em contato.

---

**Mariah Copilot** - Transformando vistorias imobiliárias com inteligência artificial 🏠✨
