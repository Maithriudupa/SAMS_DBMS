import React, { useState } from 'react'; 
import { Document, Page,pdfjs } from 'react-pdf'; 
import Axios from 'axios';



export default function Test(props) { 
	const file = props;
	const [posts, setPosts]= React.useState([])
	console.log(file.upload);
	const getPosts = async () => {
		try {
	  const userPosts = await Axios.get("http://localhost:3001/student/viewAssignment",{
		  file:file.upload,
		  responseType: "blob"
		  //Force to receive data in a Blob Format
	  })
	  
		//Create a Blob from the PDF Stream
		const file = new Blob([userPosts.data], {
		  type: "application/pdf"
		});
		//Build a URL from the file
		const fileURL = URL.createObjectURL(file);
		//Open the URL on new Window
		setPosts(fileURL);
	  }
	  catch (err) {
        console.error(err.message);
      }
    };
		 
	  React.useEffect(()=>{
		  
		  getPosts()
	  })
pdfjs.GlobalWorkerOptions.workerSrc = 
`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; 
const [numPages, setNumPages] = useState(null); 
const [pageNumber, setPageNumber] = useState(1); 

/*To Prevent right click on screen*/
document.addEventListener("contextmenu", (event) => { 
	event.preventDefault(); 
}); 
	
/*When document gets loaded successfully*/
function onDocumentLoadSuccess({ numPages }) { 
	setNumPages(numPages); 
	setPageNumber(1); 
} 

function changePage(offset) { 
	setPageNumber(prevPageNumber => prevPageNumber + offset); 
} 

function previousPage() { 
	changePage(-1); 
} 

function nextPage() { 
	changePage(1); 
} 

return ( 
	<> 
	<div className="main"> 
	<Document 
		file={posts} 
		onLoadSuccess={onDocumentLoadSuccess} 
	> 
		<Page pageNumber={pageNumber} /> 
	</Document> 
	<div> 
		<div className="pagec"> 
		Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'} 
		</div> 
		<div className="buttonc"> 
		<button 
		type="button"
		disabled={pageNumber <= 1} 
		onClick={previousPage} 
		className="Pre"
			
		> 
		Previous 
		</button> 
		<button 
		type="button"
		disabled={pageNumber >= numPages} 
		onClick={nextPage} 
		
		> 
		Next 
		</button> 
		</div> 
	</div> 
	</div> 
	</> 
); 
}
