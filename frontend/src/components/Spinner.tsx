import { RotatingLines } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className="spinner-container" data-testid="spinner-container">
      <RotatingLines
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        width="40"
        visible={true}
      />
    </div>
  );
};

export default Spinner;
