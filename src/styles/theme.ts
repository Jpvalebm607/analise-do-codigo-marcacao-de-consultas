/**
 * [Tema] theme.ts
 * Responsabilidade:
 *  - Tokens de design (cores, tipografia, espaçamentos).
 * Uso:
 *  - Consumo via ThemeProvider / styled-components para padronização visual.
 */
// Tema central da aplicação, com cores, tipografia e espaçamentos
export default {
  colors: {
    primary: '#4A90E2',   // Cor principal da interface (botões, destaques)
    secondary: '#6C757D', // Cor secundária (subtítulos, elementos neutros)
    background: '#F8F9FA',// Cor de fundo geral da tela
    text: '#212529',      // Cor padrão do texto
    error: '#DC3545',     // Cor usada para erros ou alertas
    success: '#28A745',   // Cor usada para sucesso ou confirmação
    warning: '#FFC107',   // Cor usada para alertas ou status pendente
    white: '#FFFFFF',     // Cor branca padrão
    border: '#DEE2E6',    // Cor usada para bordas e separadores
  },
  typography: {
    title: {
      fontSize: 24,       // Tamanho da fonte para títulos
      fontWeight: 'bold', // Peso da fonte para títulos
    },
    subtitle: {
      fontSize: 18,       // Tamanho da fonte para subtítulos
      fontWeight: '600',  // Peso da fonte para subtítulos
    },
    body: {
      fontSize: 16,       // Tamanho da fonte para textos gerais
      fontWeight: 'normal', // Peso normal
    },
    caption: {
      fontSize: 14,       // Tamanho da fonte para legendas ou textos pequenos
      fontWeight: 'normal', // Peso normal
    },
  },
  spacing: {
    small: 8,     // Espaçamento pequeno entre elementos
    medium: 16,   // Espaçamento médio
    large: 24,    // Espaçamento grande
    xlarge: 32,   // Espaçamento extra grande
  },
};
