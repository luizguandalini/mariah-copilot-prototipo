# 🚀 Como Fazer Deploy na Vercel

Guia completo para subir o Mariah Copilot na Vercel e compartilhar com o cliente.

## 📋 Pré-requisitos

1. Conta no GitHub (gratuita)
2. Conta na Vercel (gratuita) - https://vercel.com
3. Git instalado no seu computador

## 🔧 Passo 1: Criar Repositório no GitHub

### Opção A: Pela Interface do GitHub

1. Acesse https://github.com
2. Clique em "New repository" (botão verde)
3. Configure:
   - **Nome**: `mariah-copilot-app` (ou o nome que preferir)
   - **Descrição**: "Protótipo do aplicativo Mariah Copilot para laudos imobiliários"
   - **Visibilidade**:
     - ✅ **Private** (recomendado para cliente)
     - ou Public (se quiser compartilhar publicamente)
4. **NÃO marque** "Add a README file"
5. Clique em "Create repository"

### Opção B: Criar e Configurar Localmente

Abra o terminal no diretório do projeto e execute:

```bash
cd c:\Users\Admin\Desktop\Mariah-Copilot\mariah-copilot-app

# Inicializa o repositório Git
git init

# Adiciona todos os arquivos
git add .

# Cria o primeiro commit
git commit -m "feat: Protótipo inicial do Mariah Copilot com câmera real"

# Cria o branch main (se necessário)
git branch -M main

# Adiciona o repositório remoto (SUBSTITUA com sua URL)
git remote add origin https://github.com/SEU-USUARIO/mariah-copilot-app.git

# Envia para o GitHub
git push -u origin main
```

**⚠️ IMPORTANTE**: Substitua `SEU-USUARIO` pela sua conta do GitHub

## 🌐 Passo 2: Deploy na Vercel

### Método 1: Importar do GitHub (Recomendado)

1. Acesse https://vercel.com e faça login
2. Clique em "Add New..." → "Project"
3. Clique em "Import Git Repository"
4. Conecte sua conta do GitHub (se ainda não conectou)
5. Selecione o repositório `mariah-copilot-app`
6. Configure o projeto:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (deixe como está)
   - **Build Command**: `npm run build` (já vem preenchido)
   - **Output Directory**: `dist` (já vem preenchido)
   - **Install Command**: `npm install` (já vem preenchido)
7. Clique em "Deploy"
8. Aguarde 1-2 minutos ⏳

### Método 2: Via CLI da Vercel

```bash
# Instala a CLI da Vercel globalmente
npm install -g vercel

# Faz login na Vercel
vercel login

# No diretório do projeto
cd c:\Users\Admin\Desktop\Mariah-Copilot\mariah-copilot-app

# Deploy
vercel

# Ou para deploy direto em produção
vercel --prod
```

## ✅ Passo 3: Após o Deploy

Após o deploy bem-sucedido, a Vercel vai gerar:

1. **URL de Preview**: `https://mariah-copilot-app-xxxxx.vercel.app`
2. **URL de Produção**: `https://mariah-copilot-app.vercel.app` (se você configurou um domínio)

### 🎯 Testando a Aplicação

1. Abra a URL fornecida pela Vercel
2. Teste o login
3. Crie um laudo
4. **Importante para câmera**: A Vercel fornece HTTPS automaticamente, então a câmera funcionará em dispositivos móveis!

## 📱 Compartilhando com o Cliente

### Opção 1: Enviar Link Direto

```
Olá [Nome do Cliente],

Preparei o protótipo do Mariah Copilot para sua análise.

🔗 Acesse: https://mariah-copilot-app.vercel.app

📱 Para testar a câmera:
1. Abra o link no celular (funciona melhor no Chrome mobile)
2. Faça login (pode usar Google ou Apple - é simulado)
3. Crie um novo laudo
4. Siga as instruções da câmera guiada

💡 Funcionalidades implementadas:
- Login com Google/Apple (mock)
- Criação de laudos
- Câmera guiada por ambiente (REAL!)
- Visualização de fotos organizadas
- Interface mobile-first

⚠️ Lembre-se: É um protótipo visual. Os dados são salvos apenas no navegador.

Qualquer dúvida, estou à disposição!
```

### Opção 2: Criar QR Code

1. Acesse https://www.qr-code-generator.com/
2. Cole a URL da Vercel
3. Gere o QR Code
4. Envie para o cliente poder escanear com o celular

## 🔄 Atualizando o Projeto

Sempre que fizer alterações:

```bash
# Adiciona as mudanças
git add .

# Cria um commit descritivo
git commit -m "feat: Adiciona nova funcionalidade X"

# Envia para o GitHub
git push

# A Vercel faz deploy automaticamente! 🎉
```

## ⚙️ Configurações Adicionais da Vercel

### Domínio Personalizado (Opcional)

1. No dashboard da Vercel, vá em "Settings" do projeto
2. Clique em "Domains"
3. Adicione seu domínio customizado (ex: `mariah-copilot.seusite.com`)

### Variáveis de Ambiente (Se necessário no futuro)

1. No dashboard, vá em "Settings" → "Environment Variables"
2. Adicione as variáveis necessárias

### Analytics (Opcional)

A Vercel oferece analytics gratuito:
1. Vá em "Analytics" no menu
2. Ative o Vercel Analytics
3. Veja quantas pessoas acessaram, de onde, etc.

## 🔒 Privacidade

### Se o repositório for PRIVADO:

- Apenas você e pessoas que você convidar podem ver o código
- O site continua público (qualquer um com o link pode acessar)
- Para tornar o site privado também, você precisa do plano pago da Vercel

### Se o repositório for PÚBLICO:

- Qualquer um pode ver o código no GitHub
- O site é público (qualquer um com o link pode acessar)

## 🐛 Troubleshooting

### Erro no Build

Se der erro no build da Vercel:

1. Verifique se o `package.json` está correto
2. Teste localmente: `npm run build`
3. Se funcionar local, o problema pode estar em:
   - Versão do Node.js (Vercel usa Node 18+)
   - Dependências faltando

### Câmera não funciona

- ✅ **Vercel tem HTTPS**: Câmera vai funcionar!
- ❌ **HTTP localhost**: Câmera pode não funcionar em alguns navegadores
- 💡 **Teste sempre no Chrome mobile** primeiro

### Site muito lento

- Primeiro acesso pode ser lento (cold start)
- Acessos seguintes são rápidos
- Vercel tem CDN global, então é geralmente rápido

## 📊 Estatísticas do Projeto

Após deploy, você pode ver:
- Número de visitas
- Países de origem dos visitantes
- Tempo de carregamento
- Taxa de erro

## 🎉 Pronto!

Seu protótipo está online e pronto para apresentar ao cliente!

### Links Úteis

- 📚 Documentação Vercel: https://vercel.com/docs
- 🎓 Guia Vercel + Vite: https://vercel.com/guides/deploying-vite
- 💬 Suporte Vercel: https://vercel.com/support

---

**Desenvolvido: Mariah Copilot - Protótipo** 🏠
