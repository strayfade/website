import './App.css'
import './styling/Settings.css'
import './styling/Fonts.css'

import Header from './components/Header'
import Container from './components/Container'
import ArticleHeader from './components/ArticleHeader'

function App() {
    return (
        <div className='App'>
            <Header />
            <Container>
                <ArticleHeader/>
            </Container>
        </div>
    )
}

export default App
