const ContainerComponent = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-6">
      {children}
    </div>
  );
};

export default ContainerComponent;
