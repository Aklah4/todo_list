type FooterProps = {
  doneCount: number;
  onClearCompleted: () => void;
};

function Footer({ doneCount, onClearCompleted }: FooterProps) {
  return (
    <footer className="page-footer">
      <hr className="rule" />
      <div className="footer-line">
        <span aria-live="polite">{doneCount} DONE</span>
        {doneCount > 0 && (
          <button
            className="text-button footer-clear"
            type="button"
            onClick={onClearCompleted}
          >
            CLEAR COMPLETED
          </button>
        )}
      </div>
    </footer>
  );
}

export default Footer;
