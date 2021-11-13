import '../styles/index.css';
import {FruitsProvider} from '../contexts/FruitsContext.js';
function MyApp({ Component, pageProps }) {
    return (
      <FruitsProvider>
      <div className="container mx-auto my-10 max-w-xl">
          <Component {...pageProps} />
      </div>
      </FruitsProvider>
    );
}

export default MyApp;
