import { Route, Routes } from 'react-router-dom'
import ArticleTable from '@/pages/ArticleTable'
// import ArticleForm from '@/pages/ArticleForm'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ArticleTable />} />
        {/* <Route path="/articles/new" element={<ArticleForm />} /> */}
      </Routes>
    </div>
  )
}

export default App