/**
 * [Tipos] doctors.ts
 * Responsabilidade:
 *  - Declarações de tipos para User, Appointment, Doctor, Navigation Params.
 * Benefício:
 *  - Tipagem segura, autocompletar e prevenção de erros por contrato de dados.
 */
/**
 * Tipos relacionados a médicos
 * Este arquivo contém todas as definições de tipos necessárias para o gerenciamento de médicos
 */

/**
 * Representa um médico no sistema
 * @property id - Identificador único do médico
 * @property name - Nome completo do médico
 * @property specialty - Especialidade médica
 * @property image - URL da foto do médico
 */
export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  image: string;
}; 