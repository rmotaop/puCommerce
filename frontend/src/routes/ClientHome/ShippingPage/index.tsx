import './styles.css';
// import styled from 'styled-components'
// import { Calalog } from '../components'
import shopLogo from '../assets/puCommerce.svg'
import Catalog from '../Catalog'

const ShippingPage = () => {
  return (
    <main>
      
      <div className="page section section-center">
        {/* insert about page image here */}
        <img src={shopLogo} alt='square logo' />
        <article className='title'>
          <h2>Free Shipping!!!</h2>
          <div className='underline'></div>
          <p>
            We currently offer free shipping for any places within Thailand.
          </p>
          <p>
            You will also receive a free gift from us if you spend more than
            1500B with us.
          </p>
        </article>
      </div>
    </main>
  )
}


export default ShippingPage
