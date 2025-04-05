import Card from '../Card/Card';

export default function Player({ name }) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-white font-bold mb-2">{name}</div>
        <div className="flex gap-2">
          <Card />
          <Card />
        </div>
      </div>
    );
  }