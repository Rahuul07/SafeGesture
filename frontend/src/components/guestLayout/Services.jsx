import GuestLayout from "./GuestLayout";

const Services = () => {

 return(

  <GuestLayout>

   <div className="row">

    <div className="col-md-4">
     <div className="card p-3 shadow">
      SOS Emergency Alerts
     </div>
    </div>

    <div className="col-md-4">
     <div className="card p-3 shadow">
      Live GPS Tracking
     </div>
    </div>

    <div className="col-md-4">
     <div className="card p-3 shadow">
      Video Evidence Recording
     </div>
    </div>

   </div>

  </GuestLayout>

 );

};

export default Services;