import Card from 'react-bootstrap/Card';
import ForgotPasswordSendEmail from '../components/forgotPasswordSendEmail';
import '../assets/css/forgot.css';
const ForgotPassword = () => {
    return ( 
      <div className='forgot'>
            <section className='d-flex justify-content-center'>
            <Card className='forgot-password'>
        <Card.Header className='' style={{textAlign: "center", fontSize: "20px"}}><b>Forgot Password</b></Card.Header>
        <Card.Body>
        
        <ForgotPasswordSendEmail/>
        </Card.Body>
      </Card>
      </section>
    </div>   
     );
}
 
export default ForgotPassword;