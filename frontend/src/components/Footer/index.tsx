import "./styles.css";

const Footer = () => {
  return (
    <div className="footer">
      <h5>
        &copy; {new Date().getFullYear()}
        <span> puCommerce</span><br/>
        {'  '}All rights reserved
      </h5>
    </div>
  )
}

export default Footer
