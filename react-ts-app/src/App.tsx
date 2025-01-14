import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import roureConfig from './routes/index'
 
const App: React.FC = () => {
  const routes = useRoutes(roureConfig)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {routes}
    </Suspense>
  );
};
export default App;