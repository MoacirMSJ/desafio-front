import { Botao } from "@/components/Botao/Botao";
import { Modal } from "@/components/Modal/Modal";
import styles from "./DialogoConfirmacao.module.css";

interface PropsDialogoConfirmacao {
  titulo: string;
  mensagem: string;
  rotuloConfirmar?: string;
  carregando?: boolean;
  erro?: string | null;
  aoConfirmar: () => void;
  aoCancelar: () => void;
}

export function DialogoConfirmacao({
  titulo,
  mensagem,
  rotuloConfirmar = "Confirmar",
  carregando = false,
  erro,
  aoConfirmar,
  aoCancelar,
}: PropsDialogoConfirmacao) {
  return (
    <Modal titulo={titulo} aoFechar={aoCancelar}>
      <p className={styles.mensagem}>{mensagem}</p>
      {erro && (
        <p className={styles.erro} role="alert">
          {erro}
        </p>
      )}
      <div className={styles.acoes}>
        <Botao type="button" variante="secundario" onClick={aoCancelar} disabled={carregando}>
          Cancelar
        </Botao>
        <Botao type="button" variante="perigo" onClick={aoConfirmar} disabled={carregando}>
          {carregando ? "Excluindo..." : rotuloConfirmar}
        </Botao>
      </div>
    </Modal>
  );
}
