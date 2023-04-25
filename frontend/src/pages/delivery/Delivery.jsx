import './styles/Delivery.scss';
import useFetch from '../../hooks/useFetch';
import useAssignOrder from '../../hooks/useAssignOrder';
import useDelete from '../../hooks/useDelete';
import { Icon } from '@iconify/react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useEffect } from 'react';
import ButtonAction from '../../components/ButtonAction';

const timeToNow = date => formatDistanceToNow(new Date(date), { addSuffix: true });

const Delivery = () => {
  const {
    data: orders,
    isLoading,
    errors,
    refetch
  } = useFetch('/unassigned-orders');

  const {
     data: assignedOrders,
     isLodading: assignedIsLoading,
     errors: assignedErrors,
     refetch: assignedRefetch
  } = useFetch('/assigned-orders');

  const { assign } = useAssignOrder();
  const { deleteById } = useDelete('/assigned-order');


  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      assignedRefetch();
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const handleAssign = (id) => {
    assign(id);
    refetch();
    assignedRefetch();
  }

  const handleClose = (id) => {
    deleteById(id, 'Confirm closing this order');
    refetch();
    assignedRefetch();
  }


  return (
    <div className="Delivery">
      <h2>DELIVERY</h2>
      <div className="container">
        <section className="assigned">
          <h3>assigned orders</h3>
          {assignedIsLoading && <Icon icon='eos-icons:bubble-loading' />}
          {assignedOrders?.map(order => (
            <div className='order' key={`assigned${order.id}`}>
              <div className='header'>
                <p className='address'>{order.address}</p>
                <p className='time'>{timeToNow(order.created_at)}</p>
              </div>
              <p className='city'><span>{order.city},</span> {order.postal_code}</p>
              <p className='id'>Order id: {order.id}</p>
              <ButtonAction onClick={() => handleClose(order.id)}>close order</ButtonAction>
            </div>
          ))}
          {assignedOrders?.length == 0 && !assignedIsLoading && (
            <Icon icon='system-uicons:box-open'/>
          )}
          {assignedErrors && !assignedOrders && <div className="errors">{assignedErrors}</div>}
        </section>
        <section className="orders">
          <h3>unassigned orders</h3>
          {isLoading && <Icon icon='eos-icons:bubble-loading' />}
          {orders?.map(order => (
            <div className='order' key={order.id}>
              <div className='header'>
                <p className='address'>{order.address}</p>
                <p className='time'>{timeToNow(order.created_at)}</p>
              </div>
              <p className='city'><span>{order.city},</span> {order.postal_code}</p>
              <p className='id'>Order id: {order.id}</p>
              <ButtonAction onClick={() => handleAssign(order.id)}>assign</ButtonAction>
            </div>
          ))}
          {orders?.length == 0 && !isLoading && (
            <Icon icon='system-uicons:box-open'/>
          )}
          {errors && !orders && <div className="errors">{errors}</div>}
        </section>
      </div>
    </div>
  );
}

export default Delivery;