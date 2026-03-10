import GuestLayout from "./GuestLayout";

const Login = () => {

 return(

  <GuestLayout>

   <div className="card p-4 shadow">

    <h3>Login</h3>

    <input
     className="form-control my-2"
     placeholder="Email"
    />

    <input
     type="password"
     className="form-control my-2"
     placeholder="Password"
    />

    <button className="btn btn-primary">
     Login
    </button>

   </div>

  </GuestLayout>

 );

};

export default Login;