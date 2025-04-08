import Player from '../Player/Player';
import Controls from '../Controls/Controls'

export default function Game() {
    const handleAction = (action) => {
        console.log(action); 
    };

    return (
      <div className="relative w-full h-screen bg-green-700 flex flex-col items-center justify-center">
        <div className="flex justify-between w-full">
          <div className="absolute top-5 left-10">
            <Player name="Player 1" position="top" />
          </div>
          <div className="absolute bottom-20 right-10">
            <Player name="You" position="bottom" />
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="absolute left-10 top-1/2 transform -translate-y-1/2">
            <Player name="Player 2" position="left" />
          </div>
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <Player name="Player 3" position="right" />
          </div>
        </div>
        <Controls onAction={handleAction} />
      </div>
    );
}