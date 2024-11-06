import { checkSession } from '@/lib/serverSession';

// Components
import Home from '@/components/page/Home';

const Main: React.FC = async () => {
  await checkSession();

  return (
    <div>
      <Home />
    </div>
  );
};

export default Main;
