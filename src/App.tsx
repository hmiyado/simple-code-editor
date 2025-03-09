import CodeEditor from "./editor/CodeEditor";
import "bulma/css/bulma.min.css";

function App() {
  return (
    <div className="container px-4 pt-4">
      <h1 className="title">Simple Code Editor</h1>
      <div className="box">
        <CodeEditor />
      </div>
      <footer className="footer">
        <p className="content has-text-centered">
          <a href="https://github.com/hmiyado/simple-code-editor">GitHub</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
