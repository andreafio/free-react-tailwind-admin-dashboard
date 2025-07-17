import { Link } from "react-router";
import { useUser } from "../../hooks/useUser";

export default function Sidebar() {
  const { user, loading, logout } = useUser();
  
  return (
    <div className="w-64 bg-athlos-navy text-white min-h-screen p-4">
      <div className="flex justify-center mb-8">
        <img 
          src="/images/logo/athlos-logo-dark.svg" 
          alt="Athlos" 
          className="w-32 h-auto"
        />
      </div>
      
      {loading ? (
        <div className="mb-8 text-center flex justify-center">
          <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : user ? (
        <div className="mb-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-brand-100 flex items-center justify-center mb-2">
            {user.profile_image ? (
              <img 
                src={user.profile_image} 
                alt={user.name} 
                className="w-full h-full rounded-full"
              />
            ) : (
              <span className="font-montserrat font-bold text-navy-800 text-2xl">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </span>
            )}
          </div>
          <h3 className="font-montserrat font-semibold text-lg">{user.name}</h3>
          <p className="text-sm text-gray-300">{user.email}</p>
        </div>
      ) : (
        <div className="mb-8 text-center">
          <p className="text-sm text-gray-300">Accesso non effettuato</p>
        </div>
      )}
      
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="flex items-center p-2 rounded-lg hover:bg-brand-500 transition-colors">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
              </svg>
              <span className="font-montserrat font-semibold">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/tournaments" className="flex items-center p-2 rounded-lg hover:bg-brand-500 transition-colors">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1z"></path>
              </svg>
              <span className="font-montserrat font-semibold">Tornei</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center p-2 rounded-lg hover:bg-brand-500 transition-colors">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
              </svg>
              <span className="font-montserrat font-semibold">Profilo</span>
            </Link>
          </li>
          <li>
            <Link to="/calendar" className="flex items-center p-2 rounded-lg hover:bg-brand-500 transition-colors">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
              </svg>
              <span className="font-montserrat font-semibold">Calendario</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="mt-auto pt-8">
        <button 
          onClick={() => {
            logout();
            window.location.href = '/signin';
          }}
          className="flex w-full items-center p-2 text-red-400 rounded-lg hover:bg-red-900/30 transition-colors"
        >
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 5a1 1 0 10-2 0v4.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 12.586V8z" clipRule="evenodd"></path>
          </svg>
          <span className="font-montserrat font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
}
