import { useState } from "react";

function App() {
  const [color, setColor] = useState("olive");

  return (
    <div style={{ backgroundColor: color, height: "100vh", width: "100vw" }}>
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
          <button
            onClick={() => setColor("red")}
            className="outlone-none px-4 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "red" }}>Red</button>
          <button
            onClick={() => setColor("green")}
            className="outlone-none px-4 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "green" }}>Green</button>
          <button
            onClick={() => setColor("orange")}
            className="outlone-none px-4 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "orange" }}>Orange</button>
          <button
            onClick={() => setColor("blue")}
            className="outlone-none px-4 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "blue" }}>Blue</button>
          <button
            onClick={() => setColor("olive")}
            className="outlone-none px-4 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "olive" }}>Olive</button>
          <button
            onClick={() => setColor("black")}
            className="outlone-none px-4 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "black" }}>Black</button>
          <button
            onClick={() => setColor("pink")}
            className="outlone-none px-4 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "pink" }}>Pink</button>
          <button
            onClick={() => setColor("white")}
            className="outlone-none px-4 py-1 rounded-full text-black shadow-lg" style={{ backgroundColor: "white" }}>White</button>
          <button
            onClick={() => setColor("lavender")}
            className="outlone-none px-4 py-1 rounded-full text-black shadow-lg" style={{ backgroundColor: "lavender" }}>levender</button>
          <button
            onClick={() => setColor("purple")}
            className="outlone-none px-4 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "purple" }}>purple</button>

        </div>
      </div>
    </div>
  );
}

export default App;
