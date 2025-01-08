import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor({ value, onChange }) {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],       
      ['blockquote', 'code-block'],
    
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],     
      [{ 'indent': '-1'}, { 'indent': '+1' }],         
      [{ 'direction': 'rtl' }],                         
    
      [{ 'size': ['small', false, 'large', 'huge'] }], 
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
      [{ 'color': [] }, { 'background': [] }],          
      [{ 'font': [] }],
      [{ 'align': [] }],
    
      ['clean']                                       
    ],
  };
  
  return (
    <ReactQuill
      value={value}
      theme={'snow'}
      onChange={onChange}
      modules={modules} />
  );
}