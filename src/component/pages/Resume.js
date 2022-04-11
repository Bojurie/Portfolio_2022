import React,  { useState }from 'react'
import {Document ,Page } from 'react-pdf/dist/esm/entry.webpack';
import {Container, Header, Grid,} from 'semantic-ui-react'

import './Resume.css'

import MyReume from '../Resume.pdf';

const Resume = () => {
   const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({numPages}) => {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = (offSet) => {
    setPageNumber(prevPageNumber => prevPageNumber + offSet);
  }

  const changePageBack = () =>{
    changePage(-1)
  }

  const changePageNext = () =>{
    changePage(+1)
  }

  return (
        <div className='resume_wrapper'>
        <Container fluid>
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column width={16}>
                      <Header className='about_header' as='h1'>Resume</Header> 
                        <Document file={MyReume} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page height="600" pageNumber={pageNumber} />
                          </Document>
                          <p> Page {pageNumber} of {numPages}</p>
                          { pageNumber > 1 && 
                          <button onClick={changePageBack}>Previous Page</button>
                          }
                          {
                            pageNumber < numPages &&
                            <button onClick={changePageNext}>Next Page</button>
                          }
                        <center>
                          <div>
                            <Document file="../Resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                              {Array.from(
                                new Array(numPages),
                                (el,index) => (
                                  <Page 
                                    key={`page_${index+1}`}
                                    pageNumber={index+1}
                                  />
                                )
                              )}
                            </Document>
                          </div>
                        </center>
          </Grid.Column>
      </Grid.Row>
      </Grid>
    </Container>
           
    </div>
  );
}
export default Resume;
