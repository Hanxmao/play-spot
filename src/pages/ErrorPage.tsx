import { isRouteErrorResponse, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
     
        <h1>Oops</h1>
        <p>
          {isRouteErrorResponse(error) ? "Page does not exist" : "An error occurred"}
        </p>
    </div>
  );
};

export default ErrorPage;
