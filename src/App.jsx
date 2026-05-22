import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Search from './components/Search'




const App = () => {
  const [searchTerm, setSearchTerm] = useState('I am a state')
  
  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <h1>Find <span className='text-gradient'>Movies</span> and TV Shows Easily</h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
      
    </main>
    
  )
}

export default App
