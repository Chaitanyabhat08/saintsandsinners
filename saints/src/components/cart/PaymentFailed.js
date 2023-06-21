import './PaymentFailed.css';
import { useNavigate } from 'react-router';

const PaymentFailed = () => {
  const navigateTo = useNavigate();
  return (
    <div className='mainDiv'>
      <div class="card">
        <div style={{ "border-radius": "200px", "height": "200px", "width": "200px", "background": "#F8FAF5", "margin": "0 auto" }}>
          <i class="checkmark">X</i>
        </div>
        <h1 className="headingFail">Failed</h1>
        <p>Sorry<br /> Must be problem from our side</p>
        <div className="buttonSet">
          <button onClick={() => navigateTo('/order/confirm')}>Try again</button>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailed;