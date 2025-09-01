import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { motion } from "framer-motion";
import { FiDownload, FiChevronLeft, FiChevronRight } from "react-icons/fi";
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
    <section className="section resume" id="resume">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="highlight">05.</span> My Resume
        </motion.h2>

        <motion.div
          className="resume-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="resume-actions">
            <motion.a
              href={MyResume}
              download
              className="download-btn"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiDownload className="download-icon" />
              Download PDF
            </motion.a>
          </div>

          <div className="pdf-viewer">
            <Document file={MyResume} onLoadSuccess={onDocumentLoadSuccess}>
              <Page
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="pdf-page"
              />
            </Document>

            <div className="pdf-controls">
              <div className="page-info">
                Page {pageNumber} of {numPages}
              </div>
              <div className="nav-buttons">
                {pageNumber > 1 && (
                  <motion.button
                    onClick={() => changePage(-1)}
                    className="nav-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiChevronLeft />
                    Previous
                  </motion.button>
                )}
                {pageNumber < numPages && (
                  <motion.button
                    onClick={() => changePage(1)}
                    className="nav-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next
                    <FiChevronRight />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
