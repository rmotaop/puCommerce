import "./styles.css";
import computerImg from "../../assets/img/computer.png";
import {Order, OrderItem } from "../../types/order";
import { Link } from "react-router-dom";

type Props = {
  order: Order;
  orderitem: OrderItem;
};

export default function OrderCard({ order, orderitem }: Props) {
  return (
    <Link to={`/order-details/${order.id}`}>
          <h1>TESTE</h1>
      <div className="dsc-card">
        <div className="dsc-catalog-card-top dsc-line-bottom">
          <img src={orderitem.imgUrl} alt={orderitem.name} />
        </div>
        <div className="dsc-catalog-card-bottom">
          <h3>R$ {orderitem.price.toFixed(2)}</h3>
          <h4>{orderitem.name}</h4>
        </div>
      </div>
    </Link>
  );
}
