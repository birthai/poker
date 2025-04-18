export default function Controls({ onAction }) {
    return (
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
        <button onClick={() => onAction('fold')} className="btn">Fold</button>
        <button onClick={() => onAction('check')} className="btn">Check</button>
        <button onClick={() => onAction('raise')} className="btn">Raise</button>
      </div>
    );
}
  