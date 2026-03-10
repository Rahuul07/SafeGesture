import GuestLayout from "./GuestLayout";

const Register = () => {

 return(

  <GuestLayout>

   <div className="card p-4 shadow">

    <h3>Register</h3>

    <input className="form-control my-2" placeholder="Name"/>

    <input className="form-control my-2" placeholder="Email"/>

    <input
     type="password"
     className="form-control my-2"
     placeholder="Password"
    />

    <button className="btn btn-success">
     Register
    </button>

   </div>

  </GuestLayout>

 );

};

export default Register;