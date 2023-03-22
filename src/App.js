// left with -input file's url => canvas
import React, { useState, useRef } from "react";
import "./styles.css";
import PdfUrlViewer from "./PdfUrlViewer";

export default function App() {
  const [scale, setScale] = useState(1);
  const [page, setPage] = useState(1);
  const windowRef = useRef();
  const [url, setUrl] = useState("oodmetrics.pdf");

  const scrollToItem = () => {
    windowRef.current && windowRef.current.scrollToItem(page - 1, "start");
  };
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    const file = fileInputRef.current.files[0];
    console.log("pdf url :",file && URL.createObjectURL(file));
  };

  function showPdf(event) {
    const file = event.target.files[0];
    console.log(file);
    const uri = URL.createObjectURL(file);
    console.log("uri :",uri);
    setUrl(uri);
  }
  
  // async function showPdf(event) {
  //   try {
  //     // setPdfRendering(true);
  //     // const file = event.target.files[0];
  //     // const uri = URL.createObjectURL(file);
  //     // var _PDF_DOC = await PDFJS.getDocument({ url: uri });
  //     // setPdf(_PDF_DOC);
  //     // // setPdfRendering(false);
  //     // document.getElementById("file-to-upload").value = "";
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // }

  return (
    <div className="App">
      <h1>Pdf Viewer</h1>
      <div>
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
        <input
          type="file"
          id="file-to-upload"
          accept="application/pdf"
          onChange={showPdf}
        />

        <input value={page} onChange={e => setPage(e.target.value)} />
        <button type="button" onClick={scrollToItem}>
          goto
        </button>
        Zoom
        <button type="button" onClick={() => setScale(v => v + 0.1)}>
          +
        </button>
        <button type="button" onClick={() => setScale(v => v - 0.1)}>
          -
        </button>
      </div>
      <br />
      <PdfUrlViewer url={url} scale={scale} windowRef={windowRef} />
      <p>
        https://mozilla.github.io/pdf.js/examples/index.html#interactive-examples
      </p>
      <p>https://react-window.now.sh/#/examples/list/variable-size</p>
    </div>
  );
}
