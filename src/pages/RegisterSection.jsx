import Registration from "../components/Registration";

const RegisterSection = () => {
  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4 py-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-russ mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-orange-600">
          Join the Corps
        </h1>
        <p className="text-center text-gray-300 max-w-2xl mx-auto">
          The Final Selection is approaching. Register your team and prove your
          worth.
        </p>
      </div>
      <Registration />
    </div>
  );
};

export default RegisterSection;
