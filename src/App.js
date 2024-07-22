import './App.css';

function App() {
  const hearts = Array.from({ length: 10 }, (_, i) => <div key={i} className="heart"></div>);

  return (
    <div className="App">
      {hearts}
      <header className="App-header">
        <p className="custom-message">
          Lo logré, esposita mía, te amo mucho
        </p>
      </header>
    </div>
  );
}

export default App;
