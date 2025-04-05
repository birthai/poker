export default function Card({ face = false }) {
    return (
      <div className="w-12 h-16 bg-white border rounded shadow-md flex items-center justify-center">
        {face ? '🂡' : '🎴'}
      </div>
    );
  }