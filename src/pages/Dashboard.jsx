import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { logout } = useAuth();
  return (
    <>
      <h1>Protected Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
}