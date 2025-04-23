import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner"
import { Input } from "@/components/ui/input";
import { useState } from "react";

function RegisterPage() {

  const [data, setData] = useState({
    firstname : "",
    lastname : "",
    email : "",
    password : "",
    confirmPass : ""
  })

  async function doRegister(event : any) : Promise<void> {
    event.preventDefault();
    var obj = {firstname: data.firstname, lastname: data.lastname, email: data.email, password: data.password};
    var js = JSON.stringify(obj);
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
      var res = await response.json()
      if(response.status == 201) {
        toast.success("Account created!")
      }
      else if (response.status == 400 && res.error == "All fields are required") {
        toast.error("All fields are required!")
      }
      else if (response.status == 400 && res.error == "Email already registered") {
        toast.error("Email is already registered!")
      }
      else {
        toast.error("Account is unable to be created! Please check your input")
      }
    }
    catch(error:any) {
      toast.error("Account creation failed!")
    }
  }

  return (
    <div className="pt-20 flex items-center justify-center">
      <Card className="max-w-md p-10 mb-20 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="firstName"
                  className="block text-left text-sm font-medium text-gray-900"
                >
                  First Name
                </label>
                <Input
                  type="text"
                  id="firstName"
                  className="mt-1 h-12 w-full rounded-md border-gray-400 text-sm px-2"
                  placeholder="Enter your first name"
                  value = {data.firstname}
                  onChange = {(e) => setData({...data, firstname: e.target.value})}
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="lastName"
                  className="block text-left text-sm font-medium text-gray-900"
                >
                  Last Name
                </label>
                <Input
                  type="text"
                  id="lastName"
                  className="mt-1 h-12 w-full rounded-md border-gray-400 text-sm px-2"
                  placeholder="Enter your last name"
                  value = {data.lastname}
                  onChange = {(e) => setData({...data, lastname: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-left text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <Input
                type="email"
                id="email"
                className="mt-1 h-12 w-full rounded-md border-gray-400 text-sm px-3"
                placeholder="Enter your email"
                value = {data.email}
                onChange = {(e) => setData({...data, email: e.target.value})}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-left text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <Input
                type="password"
                id="password"
                className="mt-1 h-12 w-full rounded-md border-gray-400 text-sm px-3"
                placeholder="Enter your password"
                value = {data.password}
                onChange = {(e) => setData({...data, password: e.target.value})}
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-left text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <Input
                type="password"
                id="confirmPassword"
                className="mt-1 h-12 w-full rounded-md border-gray-400 text-sm px-3"
                placeholder="Re-enter your password"
                value = {data.confirmPass}
                onChange = {(e) => setData({...data, confirmPass: e.target.value})}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full h-10" onClick={doRegister}>Create account</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegisterPage;
