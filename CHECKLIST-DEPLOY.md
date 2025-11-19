# ✅ Checklist para Deploy e Apresentação ao Cliente

Use este checklist para garantir que tudo está pronto antes de apresentar ao cliente.

## 📋 Antes de Fazer o Deploy

### Código
- [x] Botão "Enviar para Mariah" implementado
- [x] Câmera real funcionando
- [x] Fluxo refazer/próxima implementado
- [x] Configuração de rede local habilitada
- [x] Todos os arquivos CSS atualizados
- [x] Sem erros no console do navegador

### Documentação
- [x] README.md atualizado e profissional
- [x] DEPLOY-VERCEL.md criado
- [x] COMO-ACESSAR-NO-CELULAR.md criado
- [x] .gitignore configurado

### Arquivos do Projeto
- [x] package.json atualizado
- [x] vite.config.js configurado para rede
- [x] Dependências instaladas (`node_modules/`)
- [x] Build testado localmente (`npm run build`)

## 🚀 Deploy no GitHub

### Passo 1: Preparar Repositório Local
```bash
cd c:\Users\Admin\Desktop\Mariah-Copilot\mariah-copilot-app
```

- [ ] Inicializar Git
  ```bash
  git init
  ```

- [ ] Adicionar arquivos
  ```bash
  git add .
  ```

- [ ] Criar primeiro commit
  ```bash
  git commit -m "feat: Protótipo inicial Mariah Copilot com câmera real e sistema guiado"
  ```

### Passo 2: Criar Repositório no GitHub
- [ ] Ir para https://github.com/new
- [ ] Nome do repositório: `mariah-copilot-app`
- [ ] Descrição: "Protótipo de aplicativo mobile para laudos imobiliários com câmera guiada"
- [ ] Escolher: Private (recomendado) ou Public
- [ ] NÃO marcar "Add README"
- [ ] Clicar em "Create repository"

### Passo 3: Conectar e Enviar
- [ ] Copiar a URL do repositório criado
- [ ] Adicionar remote:
  ```bash
  git remote add origin https://github.com/SEU-USUARIO/mariah-copilot-app.git
  ```

- [ ] Enviar para GitHub:
  ```bash
  git branch -M main
  git push -u origin main
  ```

## 🌐 Deploy na Vercel

### Opção A: Via Interface (Mais Fácil)
- [ ] Acessar https://vercel.com
- [ ] Fazer login (ou criar conta)
- [ ] Clicar em "Add New..." → "Project"
- [ ] Conectar conta GitHub (se ainda não conectou)
- [ ] Selecionar repositório `mariah-copilot-app`
- [ ] Verificar configurações:
  - Framework: Vite ✅
  - Build Command: `npm run build` ✅
  - Output Directory: `dist` ✅
- [ ] Clicar em "Deploy"
- [ ] Aguardar conclusão (1-2 min)
- [ ] Copiar URL gerada

### Opção B: Via CLI
- [ ] Instalar Vercel CLI:
  ```bash
  npm install -g vercel
  ```

- [ ] Fazer login:
  ```bash
  vercel login
  ```

- [ ] Deploy:
  ```bash
  vercel --prod
  ```

- [ ] Copiar URL gerada

## 🧪 Testar o Deploy

### No Computador
- [ ] Abrir URL da Vercel no navegador
- [ ] Testar login (Google ou Apple)
- [ ] Criar um laudo de teste
- [ ] Preencher formulário completo
- [ ] Verificar se navegação funciona

### No Celular
- [ ] Abrir URL no Chrome mobile
- [ ] Fazer login
- [ ] Criar novo laudo
- [ ] Testar câmera:
  - [ ] Permitir acesso à câmera
  - [ ] Verificar se preview aparece
  - [ ] Tirar foto
  - [ ] Testar botão "Refazer"
  - [ ] Testar botão "Próxima"
- [ ] Completar pelo menos 1 ambiente
- [ ] Visualizar fotos no laudo

### Testar Perguntas Condicionais
- [ ] Responder "Sim" para avaria
- [ ] Verificar se câmera abre
- [ ] Tirar foto da avaria
- [ ] Responder "Não" para avaria
- [ ] Verificar se pula para próxima

## 📱 Preparar Apresentação ao Cliente

### Material para Enviar
- [ ] URL do aplicativo (Vercel)
- [ ] QR Code da URL (opcional)
- [ ] Screenshot da tela inicial
- [ ] Screenshot do fluxo de câmera
- [ ] Vídeo curto demonstrativo (opcional)

### E-mail/Mensagem para o Cliente

```
Assunto: Protótipo Mariah Copilot - Pronto para Avaliação

Olá [Nome do Cliente],

O protótipo do Mariah Copilot está pronto para sua análise!

🔗 **Acesse aqui**: [URL DA VERCEL]

📱 **Como testar**:
1. Abra o link acima no seu celular (preferencialmente Chrome)
2. Faça login (pode escolher Google ou Apple - é simulado)
3. Toque em "Criar Novo Laudo"
4. Preencha os dados do imóvel
5. Toque em "Iniciar Vistoria"
6. Permita o acesso à câmera quando solicitado
7. Siga as instruções do assistente

💡 **Principais funcionalidades**:
✅ Sistema de câmera guiada por ambiente
✅ Instruções passo a passo
✅ Detecção de avarias
✅ Organização automática de fotos
✅ Interface mobile otimizada
✅ Botão "Enviar para Mariah"

⚠️ **Importante**:
- Este é um protótipo visual/funcional
- Dados salvos apenas no navegador (não há backend)
- Câmera utiliza API nativa do navegador
- Melhor experiência no Chrome mobile

🎥 **Dica**: Teste em um ambiente real para melhor experiência!

Aguardo seu feedback!

Atenciosamente,
[Seu Nome]
```

### Criar QR Code (Opcional)
- [ ] Acessar https://www.qr-code-generator.com/
- [ ] Colar URL da Vercel
- [ ] Gerar QR Code
- [ ] Baixar imagem
- [ ] Enviar junto com o e-mail

## 📊 Acompanhamento

### Durante Apresentação
- [ ] Anotar feedback do cliente
- [ ] Listar sugestões de melhorias
- [ ] Identificar bugs reportados
- [ ] Registrar dúvidas

### Após Apresentação
- [ ] Criar issues no GitHub para melhorias
- [ ] Priorizar correções necessárias
- [ ] Planejar próxima iteração

## 🐛 Troubleshooting Rápido

### Se câmera não funcionar:
1. Verificar se está usando HTTPS (Vercel já fornece)
2. Verificar permissões do navegador
3. Testar no Chrome mobile primeiro
4. Verificar console do navegador (F12)

### Se build falhar na Vercel:
1. Testar localmente: `npm run build`
2. Verificar logs de erro na Vercel
3. Verificar versão do Node.js

### Se site não carregar:
1. Verificar se deploy concluiu com sucesso
2. Limpar cache do navegador
3. Tentar em navegador anônimo
4. Verificar console de erros

## ✨ Checklist Final

Antes de enviar para o cliente:
- [ ] URL funcionando
- [ ] Câmera testada no celular
- [ ] Sem erros no console
- [ ] README.md revisado
- [ ] E-mail/mensagem preparado
- [ ] Screenshots/vídeos prontos (se aplicável)
- [ ] Backup do código local

---

**Tudo pronto? É hora de impressionar o cliente! 🚀**
