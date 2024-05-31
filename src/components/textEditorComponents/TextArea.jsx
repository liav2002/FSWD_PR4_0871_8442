
function TextArea({ content}){

  return (
    <div>
      {content.map((item, index) => 
        <span key={index} style={{
          color: item.color,
          fontSize: item.fontSize,
          fontWeight: item.bold ? 'bold' : 'normal',
          fontStyle: item.italic ? 'italic' : 'normal',
          textDecoration: item.underline ? 'underline' : 'none',
          fontFamily: item.font
        }}>
          {item.value}
        </span>
      )}
    </div>
  );
};

export default TextArea;
