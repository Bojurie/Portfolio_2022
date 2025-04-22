import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { Container, Header, Grid, Button, Icon } from "semantic-ui-react";
import "./Resume.css";
import MyResume from "../Resume.pdf";

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset) => setPageNumber((prev) => prev + offset);

  return (
    <section className="resume-section">
      <Container className="resume-container">
        <Header as="h1" className="resume-title">
          <Icon name="file alternate outline" /> My Resume
        </Header>

        <div className="pdf-controls">
          <a href={MyResume} download className="download-btn">
            <Button color="green" icon labelPosition="left">
              <Icon name="download" /> Download PDF
            </Button>
          </a>
        </div>

        <div className="pdf-viewer">
          <Document file={MyResume} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>

          <div className="nav-buttons">
            {pageNumber > 1 && (
              <Button onClick={() => changePage(-1)} basic color="green">
                Previous
              </Button>
            )}
            {pageNumber < numPages && (
              <Button onClick={() => changePage(1)} basic color="green">
                Next
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Resume;
