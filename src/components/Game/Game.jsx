import Player from '../Player/Player';

export default function Game() {
    return (
      <div className="relative w-full h-screen bg-green-700 flex items-center justify-center">
        <div className="absolute top-10">
          <Player name="Player 1" position="top" />
        </div>
        <div className="absolute bottom-10">
          <Player name="You" position="bottom" />
        </div>
        <div className="absolute left-10 top-1/2 -translate-y-1/2">
          <Player name="Player 2" position="left" />
        </div>
        <div className="absolute right-10 top-1/2 -translate-y-1/2">
          <Player name="Player 3" position="right" />
        </div>
      </div>
    );
}