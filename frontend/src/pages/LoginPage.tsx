import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-full max-w-md p-10 mb-40 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
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
                className="mt-1 h-10 w-full rounded-md border-gray-400 text-sm"
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
                className="mt-1 h-10 w-full rounded-md border-gray-400 text-sm "
                placeholder="Enter your password"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full h-10">Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
