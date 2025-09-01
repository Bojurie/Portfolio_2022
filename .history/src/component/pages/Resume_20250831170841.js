import React, { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion } from "framer-motion";
import {
  FiDownload,
  FiChevronLeft,
  FiChevronRight,
  FiZoomIn,
  FiZoomOut,
  FiRotateCw,
  FiSmartphone,
  FiTablet,
  FiMonitor,
} from "react-icons/fi";
import "./Resume.scss";
import MyResume from "../Resume.pdf";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setIsLoading(false);
    setError(null);
  }, []);

  const onDocumentLoadError = useCallback((error) => {
    console.error("Error loading PDF:", error);
    setError("Failed to load resume. Please try again or download directly.");
    setIsLoading(false);
  }, []);

  const changePage = useCallback(
    (offset) => {
      setPageNumber((prev) => Math.max(1, Math.min(prev + offset, numPages)));
    },
    [numPages]
  );

  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.2, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  }, []);

  const rotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  const resetView = useCallback(() => {
    setScale(1.2);
    setRotation(0);
  }, []);

  const devicePresets = {
    mobile: { scale: 1.0, rotation: 0 },
    tablet: { scale: 1.2, rotation: 0 },
    desktop: { scale: 1.5, rotation: 0 },
  };

  const applyDevicePreset = useCallback((preset) => {
    setScale(preset.scale);
    setRotation(preset.rotation);
  }, []);

  return (
    <section className="resume-section" id="resume">
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

            <div className="view-controls">
              <div className="device-presets">
                <button
                  className="device-btn"
                  onClick={() => applyDevicePreset(devicePresets.mobile)}
                  aria-label="Mobile view"
                >
                  <FiSmartphone />
                </button>
                <button
                  className="device-btn"
                  onClick={() => applyDevicePreset(devicePresets.tablet)}
                  aria-label="Tablet view"
                >
                  <FiTablet />
                </button>
                <button
                  className="device-btn"
                  onClick={() => applyDevicePreset(devicePresets.desktop)}
                  aria-label="Desktop view"
                >
                  <FiMonitor />
                </button>
              </div>

              <div className="zoom-controls">
                <button
                  className="control-btn"
                  onClick={zoomOut}
                  disabled={scale <= 0.5}
                  aria-label="Zoom out"
                >
                  <FiZoomOut />
                </button>
                <span className="zoom-level">{Math.round(scale * 100)}%</span>
                <button
                  className="control-btn"
                  onClick={zoomIn}
                  disabled={scale >= 3}
                  aria-label="Zoom in"
                >
                  <FiZoomIn />
                </button>
                <button
                  className="control-btn"
                  onClick={rotate}
                  aria-label="Rotate"
                >
                  <FiRotateCw />
                </button>
                <button
                  className="control-btn"
                  onClick={resetView}
                  aria-label="Reset view"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="pdf-container">
            {isLoading && (
              <div className="pdf-loading">
                <div className="loading-spinner"></div>
                <p>Loading resume...</p>
              </div>
            )}

            {error && (
              <div className="pdf-error">
                <p>{error}</p>
                <a href={MyResume} download className="error-download-btn">
                  <FiDownload /> Download Instead
                </a>
              </div>
            )}

            <div className="pdf-viewer">
              <Document
                file={MyResume}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={<div className="pdf-loading">Loading resume...</div>}
                error={<div className="pdf-error">Failed to load resume</div>}
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  rotate={rotation}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="pdf-page"
                  loading={<div className="page-loading">Loading page...</div>}
                />
              </Document>

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
                    <FiChevronRight />
                  </motion.button>
                </div>

                <div className="mobile-swipe-hint">
                  <span>Swipe to navigate</span>
                </div>
              </div>
            </div>
          </div>

          <div className="resume-footer">
            <p className="resume-note">
              For the best viewing experience, download the PDF version. This
              interactive viewer works best on modern browsers.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
