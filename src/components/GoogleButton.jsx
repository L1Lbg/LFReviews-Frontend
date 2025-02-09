export default function GoogleButton() {
    return (
      <div id="GoogleButton">
        <button
          type="button"
          onClick={() => {
            window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/oauth2/get-redirect`;
          }}
          className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
            alt="Google Login"
            className="w-5 h-5"
          />
        </button>
      </div>
    );
  }