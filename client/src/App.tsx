import ArticleForm from '@/pages/ArticleForm';
import ArticleTable from '@/pages/ArticleTable';
import Home from '@/pages/home';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticleTable />} />
        <Route path="/articles/new" element={<ArticleForm />} />
        <Route path="/articles/update/:code" element={<ArticleForm />} />
        <Route path="/articles/delete/:code" element={<ArticleTable />} />
      </Routes>
    </div>
  );
}

export default App;
