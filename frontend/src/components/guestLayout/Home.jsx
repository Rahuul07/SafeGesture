import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaMapMarkedAlt,
  FaVideo,
  FaUserShield,
  FaBell,
  FaMobileAlt
} from "react-icons/fa";


const Home = () => {


  const features = [
    {
      icon: <FaMobileAlt />,
      title: "Z Gesture Emergency",
      desc: "Draw a Z pattern on your phone to instantly trigger an SOS alert."
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Live Location Tracking",
      desc: "Real-time GPS tracking helps police locate the victim immediately."
    },
    {
      icon: <FaVideo />,
      title: "Automatic Video Recording",
      desc: "Camera records 15 seconds of evidence and sends it to authorities."
    },
    {
      icon: <FaBell />,
      title: "Instant Police Alerts",
      desc: "Emergency alerts are instantly sent to the nearest police authority."
    },
    {
      icon: <FaUserShield />,
      title: "Admin Monitoring",
      desc: "Admins monitor and manage alerts to ensure fast response."
    },
    {
      icon: <FaShieldAlt />,
      title: "AI Safety System",
      desc: "Smart AI-based emergency detection ensures faster help."
    }
  ];

  return (
    <>
      <style>
        {`

       .hero-section{
min-height:100vh;
display:flex;
align-items:center;
padding-top:100px;
background:linear-gradient(135deg,#0f2027,#203a43,#2c5364);
color:white;
}
        .hero-title{
          font-size:55px;
          font-weight:bold;
        }

        .hero-subtitle{
          font-size:20px;
          opacity:0.9;
          margin-top:20px;
        }

        .cta-button{
          margin-top:30px;
          font-size:18px;
          padding:12px 30px;
          border-radius:30px;
          background:#ff6a00;
          border:none;
        }

        .cta-button:hover{
          background:#ff9500;
          transform:scale(1.05);
        }

        .features-section{
          padding:80px 0;
          background:#f5f7fb;
        }

        .feature-card{
          border:none;
          border-radius:20px;
          padding:30px;
          text-align:center;
          transition:all .3s;
          background:rgba(255,255,255,0.8);
          backdrop-filter:blur(10px);
          box-shadow:0 10px 30px rgba(0,0,0,0.1);
        }

        .feature-card:hover{
          transform:translateY(-10px);
          box-shadow:0 20px 40px rgba(0,0,0,0.15);
        }

        .feature-icon{
          font-size:40px;
          color:#ff6a00;
          margin-bottom:15px;
        }

        .how-section{
          padding:80px 0;
          background:linear-gradient(135deg,#141e30,#243b55);
          color:white;
        }

        .step-card{
          text-align:center;
          padding:20px;
        }

        .stats-section{
          padding:70px 0;
          background:#fff;
          text-align:center;
        }

        .stat-number{
          font-size:40px;
          font-weight:bold;
          color:#764ba2;
        }

        `}
      </style>

      {/* HERO SECTION */}
      <div className="hero-section">

        <Container>

          <Row className="align-items-center">

            <Col md={6}>

              <motion.div
                initial={{opacity:0,y:40}}
                animate={{opacity:1,y:0}}
                transition={{duration:0.8}}
              >

                <h1 className="hero-title">
                  SafeGesture AI Women Safety System
                </h1>

                <p className="hero-subtitle">
                  Draw a Z gesture on your mobile to send instant emergency
                  alerts, live location, and video evidence to nearby police.
                </p>

               <Button
  className="cta-button"
  onClick={() =>
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    })
  }
>
  Get Started
</Button>
              </motion.div>

            </Col>

            <Col md={6}>

              <motion.img
                initial={{opacity:0,scale:0.8}}
                animate={{opacity:1,scale:1}}
                transition={{duration:0.8}}
                src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
                alt="Safety Illustration"
                style={{width:"100%"}}
              />

            </Col>

          </Row>

        </Container>

      </div>

      {/* FEATURES */}

      <div className="features-section">

        <Container>

          <h2 className="text-center mb-5">
            Key Features
          </h2>

          <Row>

            {features.map((item,index)=>(
              <Col md={4} className="mb-4" key={index}>

                <motion.div
                  whileHover={{scale:1.05}}
                >

                  <Card className="feature-card">

                    <div className="feature-icon">
                      {item.icon}
                    </div>

                    <h5>{item.title}</h5>

                    <p>{item.desc}</p>

                  </Card>

                </motion.div>

              </Col>
            ))}

          </Row>

        </Container>

      </div>

      {/* HOW IT WORKS */}

      <div className="how-section">

        <Container>

          <h2 className="text-center mb-5">
            How SafeGesture Works
          </h2>

          <Row>

            <Col md={3} className="step-card">
              <h4>1</h4>
              <p>Draw Z Gesture</p>
            </Col>

            <Col md={3} className="step-card">
              <h4>2</h4>
              <p>Camera Records Evidence</p>
            </Col>

            <Col md={3} className="step-card">
              <h4>3</h4>
              <p>Alert Sent to Police</p>
            </Col>

            <Col md={3} className="step-card">
              <h4>4</h4>
              <p>Authorities Respond Quickly</p>
            </Col>

          </Row>

        </Container>

      </div>

      {/* STATS */}

      <div className="stats-section">

        <Container>

          <Row>

            <Col md={4}>
              <div className="stat-number">500+</div>
              <p>Users Protected</p>
            </Col>

            <Col md={4}>
              <div className="stat-number">120+</div>
              <p>Alerts Resolved</p>
            </Col>

            <Col md={4}>
              <div className="stat-number">35+</div>
              <p>Authorities Connected</p>
            </Col>

          </Row>

        </Container>

      </div>

    </>
  );

};

export default Home;