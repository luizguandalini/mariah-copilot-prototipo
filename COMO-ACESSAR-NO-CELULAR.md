# Como Acessar o Mariah Copilot no Celular

## 🚀 Servidor já está rodando!

O servidor está ativo e pronto para ser acessado via rede local.

### 📱 Passos para acessar no celular:

1. **Certifique-se que o celular está na mesma rede Wi-Fi que o computador**
   - Rede Wi-Fi atual do PC: `192.168.31.x`

2. **Abra o navegador do celular** (Chrome, Safari, Firefox, etc.)

3. **Digite um dos seguintes endereços na barra de URL:**

   **Opção 1 (Rede Wi-Fi principal):**
   ```
   http://192.168.31.6:5174
   ```

   **Opção 2 (Rede Virtual):**
   ```
   http://172.28.208.1:5174
   ```

4. **Pronto!** O aplicativo deve abrir no celular

## 📸 Usando a Câmera

Quando você acessar a tela de vistoria e a câmera for solicitada:

1. O navegador vai pedir permissão para usar a câmera
2. **Clique em "Permitir"**
3. A câmera do seu celular será ativada automaticamente
4. Tire a foto clicando no botão "Capturar Foto"
5. Você verá a foto capturada e poderá:
   - **Refazer**: Tira a foto novamente
   - **Próxima**: Confirma a foto e vai para a próxima instrução

## 🔧 Se não funcionar:

### Problema: Não consigo acessar o endereço

**Solução 1:** Verifique se o firewall do Windows está bloqueando
- Abra o Firewall do Windows
- Permita conexões na porta 5174

**Solução 2:** Tente desativar temporariamente o firewall do Windows

**Solução 3:** Confirme que ambos (PC e celular) estão na mesma rede Wi-Fi

### Problema: A câmera não funciona

**Solução 1:** Verifique as permissões do navegador
- No Chrome/Safari: Vá em Configurações > Privacidade > Câmera
- Certifique-se que o site tem permissão

**Solução 2:** Use HTTPS (navegadores modernos exigem HTTPS para câmera)
- Para desenvolvimento, alguns navegadores permitem HTTP em localhost/IPs locais
- No Chrome mobile, pode ser necessário acessar `chrome://flags` e habilitar "Insecure origins treated as secure"

**Solução 3:** Teste em diferentes navegadores
- Chrome mobile (melhor compatibilidade)
- Safari (iOS)
- Firefox mobile

## 🎯 Fluxo Completo

1. Faça login (Google ou Apple - é mock, qualquer um funciona)
2. Clique em "Criar Novo Laudo"
3. Preencha os dados do imóvel
4. Clique em "Iniciar Vistoria"
5. A câmera será ativada automaticamente
6. Siga as instruções para cada ambiente:
   - **Fachada** → 2 fotos obrigatórias + avarias (se houver)
   - **Sala** → 4 fotos obrigatórias + avarias (se houver)
   - **Cozinha** → 4 fotos obrigatórias + avarias (se houver)
   - **Banheiro** → 4 fotos obrigatórias + avarias (se houver)
   - **Quarto** → 4 fotos obrigatórias + avarias (se houver)
7. Visualize o laudo completo com todas as fotos
8. Clique em "Enviar para Mariah" (em desenvolvimento)

## 📝 Notas Importantes

- **Câmera Real**: O app agora usa a câmera REAL do celular via navigator.mediaDevices
- **Câmera Traseira**: Por padrão, usa a câmera traseira (facingMode: 'environment')
- **Qualidade**: Fotos em alta qualidade (até 1920x1080)
- **Armazenamento**: Fotos são salvas no localStorage do navegador
- **Sem Backend**: Tudo roda localmente, nenhum dado é enviado para servidor

## 🔄 Para Reiniciar o Servidor

Se precisar reiniciar:

```bash
cd mariah-copilot-app
npm run dev
```

O servidor vai mostrar os endereços de rede disponíveis.

## 💡 Dica Extra

Se quiser testar no próprio PC primeiro:
```
http://localhost:5174
```

---

**Desenvolvido como protótipo do Mariah Copilot** 🏠
