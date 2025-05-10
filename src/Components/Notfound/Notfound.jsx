import notFound from "../../assets/404 Error Page not Found with people connecting a plug-amico (1).svg";
export const Notfound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <img
        className="w-full max-w-md md:max-w-lg"
        src={notFound}
        alt="Illustration of 404 error page"
      />
    </div>
  );
};