import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-10 mb-40 shadow-lg bg-white">
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
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full h-10">Create account</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegisterPage;
