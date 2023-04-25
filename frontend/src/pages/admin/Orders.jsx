import './styles/Orders.scss';
import useFetch from '../../hooks/useFetch';
import useDelete from '../../hooks/useDelete';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import ButtonAction from '../../components/ButtonAction';

const Orders = () => {
  const { data: orders, isLoading, errors, refetch } = useFetch('/orders');
  const { deleteById } = useDelete('/order');

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 20000);

    return () => clearInterval(interval);
  }, [refetch]);

  const handleDelete = id => {
    deleteById(id);
    refetch();
  }

  return (
    <div className="AdminOrders">
      <ButtonAction to='/admin/dashboard'>return to dashboard</ButtonAction>
      <h2>ORDERS</h2>
      {isLoading && <div>LOADING <Icon icon='eos-icons:bubble-loading' /></div>}
      {orders?.length > 0 && <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Address</th>
            <th>Postal code</th>
            <th>Notes</th>
            <th>Delivery man</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user_id}</td>
              <td>{order.address}</td>
              <td>{order.city}</td>
              <td>{order.postal_code}</td>
              <td>{order.delivery_man_id ?? 'none'}</td>
              <td><ButtonAction appearance='alt' to={`/admin/edit-order/${order.id}`}>EDIT</ButtonAction></td>
              <td><ButtonAction onClick={() => handleDelete(order.id)}>DELETE</ButtonAction></td>
            </tr>
          ))}
        </tbody>
      </table>}
      {orders?.length == 0 && !isLoading && <div>No orders</div>}
      {errors && !orders && <div className="errors">{errors}</div>}
    </div>
  );
}

export default Orders;