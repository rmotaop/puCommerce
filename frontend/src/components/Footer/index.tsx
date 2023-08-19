import "./styles.css";

const Footer = () => {
  return (
    <div className="footer">
      <h5>
        &copy; {new Date().getFullYear()}
        <span> puCommerce</span>
      </h5>
      <h5>{'  '}All rights reserved</h5>
    </div>
  )
}

export default Footer
