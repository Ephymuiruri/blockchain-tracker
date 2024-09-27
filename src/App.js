import './App.css';
import logo from'./gitcoinlogo.svg' 
import DashPage from './Dashboard_page.js'
import AboutSection from './About.js';
import ContactMe from './Contact.js';
function App() {
  return (
    <>
    <div className="App" id='Home'>
      <nav id='HomePage'>
            <div className="logo">
              <img src={logo} alt="Gitcoin Tracker" id="header-logo"/>
            </div>
            <div className="menu">
                <a href="#Home">Home</a>
                <a href="#Data-Section">Data Section</a>
                <a href="#About">About</a>
                <a href="#contact">Contact Me</a>
            </div>
        </nav>
        <section className="h-text">
            <h1>Gitcoin Tracker</h1>
            <br></br>
            <a href="#Data-Section">Learn More</a>
        </section>
    </div>
    <DashPage />
    <AboutSection />
    <ContactMe/>
    </>
  );
}

export default App;
