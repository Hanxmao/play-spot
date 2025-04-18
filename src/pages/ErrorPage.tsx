import { isRouteErrorResponse, NavLink, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  //Todo: fix ui
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-3xl tracking-tight font-extrabold lg:text-6xl text-primary-600 dark:text-primary-500">
            {isRouteErrorResponse(error)
              ? "Page does not exist"
              : "An error occurred"}
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-boldmd:text-4xl ">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <NavLink
            to="/"
            className="btn inline-flex  bg-primary-600 hover:bg-primary-800  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            Back to Homepage
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
