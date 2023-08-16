
import './styles.css';
import { Link } from 'react-router-dom';
import MainImage from '../../../assets/img/puCommerce.svg';
import HeaderClient from '../../../components/HeaderClient';

const PucHome = () => {
  return (
    <>
    <div className="section">
    <HeaderClient/>
      <article className="content">
        <HomeWords />
        <ShopNowButton />
      </article>

    <div>
        <img className="main-img" src={MainImage} alt="MainImage"/>
    </div>
    <div>
      <ContactHeader />
      <ContactContent />
      <ContactForm />
    </div>
    </div>
    </>
  )
}

export default PucHome

const HomeWords = () => {
  return (
    <>
      <h1>
        Alta qualidade e
        produtos para todas as necessidades
      </h1>
      <p>
        Produtos de qualidade importados do Japão, Europa e EUA 
        e também nacionais dos melhores fornecedores.
      </p>
    </>
  )
}

const ShopNowButton = () => {
  return (
    <Link to="/catalog" className="btn hero-btn">
      Ver Produtos
    </Link>
  )
}

const ContactHeader = () => {
  return <h3>Junte-se à nossa newsletter para notificação de novos produtos!</h3>
}
const ContactForm = () => {
  return (
    <form className="contact-form">
      <input type="email" className="form-control" placeholder="informe o email" />
      <button type="submit" className="btn btn-info">
        Increva-se
      </button>
    </form>
  )
}

const ContactContent = () => {
  return (
    <p>
      Mantenha-se informado sobre a chegada de novos produtos e ganhe desconto assinando nosso
      Boletim de Notícias.
    </p>
  )
}

