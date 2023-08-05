import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>GO BACK</h1>
      <Link to="/" style={{ color: 'blue' }}>
        BLEH
      </Link>
    </>
  );
}
export default NotFound;
