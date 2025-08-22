/**
 * [Entrada] App.tsx
 * Responsabilidade:
 *  - Montar providers: ThemeProvider, AuthProvider, NavigationContainer.
 *  - Renderizar AppNavigator.
 * Observações:
 *  - Ordem dos providers importa (tema antes das telas que consomem).
 *  - Manter App.tsx simples; lógica de telas fica em /src/screens.
 */
import React from 'react';
// Provedor de contexto de autenticação
import { AuthProvider } from './src/contexts/AuthContext';
// Navegador principal da aplicação (gerencia as telas)
import { AppNavigator } from './src/navigation/AppNavigator';
// Provedor de tema para styled-components
import { ThemeProvider } from 'styled-components/native';
// Tema da aplicação com cores, tipografia e espaçamentos
import theme from './src/styles/theme';
// Barra de status do dispositivo
import { StatusBar } from 'react-native';

// Componente principal da aplicação
export default function App() {
  return (
    // Envolve a aplicação no ThemeProvider para disponibilizar o tema em todos os styled-components
    <ThemeProvider theme={theme}>
      {/* Envolve a aplicação no AuthProvider para disponibilizar o contexto de autenticação */}
      <AuthProvider>
        {/* Configura a barra de status do dispositivo */}
        <StatusBar 
          barStyle="light-content"          // Texto da barra de status claro
          backgroundColor={theme.colors.primary} // Fundo da barra usando a cor primária do tema
        />
        {/* Renderiza o navegador principal com todas as rotas da aplicação */}
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
