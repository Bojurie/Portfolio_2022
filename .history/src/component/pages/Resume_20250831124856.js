import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiDownload,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize,
  FiMinimize,
  FiRotateCw,
} from "react-icons/fi";
import "./Resume.scss";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const MyResume = "/Resume.pdf";

  useEffect(() => {
    const checkIsMobile = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobileView(isMobile);
      setScale(isMobile ? 0.8 : 1.2);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setIsLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error("Error loading PDF:", error);
    setError("Failed to load resume. Please try again.");
    setIsLoading(false);
  };

  const changePage = (offset) => {
    setPageNumber((prev) => Math.max(1, Math.min(prev + offset, numPages)));
  };

  const changeScale = (newScale) => {
    setScale(Math.max(0.5, Math.min(newScale, 3)));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const resetZoom = () => {
    setScale(isMobileView ? 0.8 : 1.2);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") changePage(-1);
      if (e.key === "ArrowRight") changePage(1);
      if (e.key === "+" || e.key === "=") changeScale(scale + 0.1);
      if (e.key === "-") changeScale(scale - 0.1);
      if (e.key === "0") resetZoom();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [scale, isMobileView]);

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
          <div className="resume-header">
            <motion.a
              href={MyResume}
              download="Bojurie_Rogers-Wright_Resume.pdf"
              className="download-btn"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiDownload className="download-icon" />
              Download PDF
            </motion.a>

            <div className="view-options">
              <motion.button
                onClick={resetZoom}
                className="view-option-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Reset zoom"
              >
                <FiRotateCw />
              </motion.button>
              <motion.button
                onClick={toggleFullscreen}
                className="view-option-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={
                  isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                }
              >
                {isFullscreen ? <FiMinimize /> : <FiMaximize />}
              </motion.button>
            </div>
          </div>

          <div className={`pdf-container ${isFullscreen ? "fullscreen" : ""}`}>
            {isLoading && (
              <div className="pdf-loading">
                <div className="loading-spinner"></div>
                <p>Loading resume...</p>
              </div>
            )}

            {error && (
              <div className="pdf-error">
                <p>{error}</p>
                <motion.button
                  onClick={() => window.location.reload()}
                  className="retry-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Again
                </motion.button>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={`page-${pageNumber}-scale-${scale}`}
                className="pdf-viewer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Document
                  file={MyResume}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={<div className="pdf-loading">Loading PDF...</div>}
                  error={<div className="pdf-error">Failed to load PDF</div>}
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="pdf-page"
                    loading={
                      <div className="page-loading">Loading page...</div>
                    }
                  />
                </Document>
              </motion.div>
            </AnimatePresence>

            <div className="pdf-controls">
              <div className="page-navigation">
                <motion.button
                  onClick={() => changePage(-1)}
                  className="nav-button prev"
                  disabled={pageNumber <= 1}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Previous page"
                >
                  <FiChevronLeft />
                  {!isMobileView && "Previous"}
                </motion.button>

                <div className="page-info">
                  Page <span className="current-page">{pageNumber}</span> of{" "}
                  <span className="total-pages">{numPages || "--"}</span>
                </div>

                <motion.button
                  onClick={() => changePage(1)}
                  className="nav-button next"
                  disabled={pageNumber >= numPages}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next page"
                >
                  {!isMobileView && "Next"}
                  <FiChevronRight />
                </motion.button>
              </div>

              <div className="zoom-controls">
                <motion.button
                  onClick={() => changeScale(scale - 0.1)}
                  className="zoom-btn"
                  disabled={scale <= 0.5}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Zoom out"
                >
                  -
                </motion.button>

                <span className="zoom-level">{Math.round(scale * 100)}%</span>

                <motion.button
                  onClick={() => changeScale(scale + 0.1)}
                  className="zoom-btn"
                  disabled={scale >= 3}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Zoom in"
                >
                  +
                </motion.button>
              </div>
            </div>
          </div>

          <div className="resume-footer">
            <p className="resume-note">
              For the best experience, download the PDF version of my resume.
            </p>
            <motion.a
              href={MyResume}
              download="Bojurie_Rogers-Wright_Resume.pdf"
              className="secondary-download-btn"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiDownload className="download-icon" />
              Download Resume
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
