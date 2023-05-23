import React, { useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function Login(props) {
    const navigate = useNavigate();
    const cookies = new Cookies();
     


    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://weak-ruby-skunk-gown.cyclic.app/api/login', {email: email, passwords: pass});
            if (response.data === 'nologin') {
                Openmodalloginfalse();
            } else {
                cookies.set('user', response.data[0].names);
                console.log(cookies.get('user')); // Pacman
                navigate('/Home');
            }
        } catch (error) {
            console.log(error);
        }
    }

  const [Showmodalloginfalse, setShowmodalloginfalse] = useState(false);
  const Closemodaloginfalse = () => setShowmodalloginfalse(false);
  const Openmodalloginfalse = () => setShowmodalloginfalse(true);

  function Modalloginfalse() {
    return (
      // Modal เข้าสู่ระบบไม่สำเร็จ
      <Modal show={Showmodalloginfalse} onHide={Closemodaloginfalse} centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            <b style={{fontSize: '22px'}}>เข้าสู่ระบบไม่สำเร็จ</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <label style={{textAlign: 'center'}}>เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง</label>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={Closemodaloginfalse}>ลองอีกครั้ง</Button>
        </Modal.Footer>
      </Modal>
    );
  }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button style={{marginTop:"10px"}} type="submit">Log In</button>
            </form>
            <Modalloginfalse />
            {/*<button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>*/}
        </div>
    )
}