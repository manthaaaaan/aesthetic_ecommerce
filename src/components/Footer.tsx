import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link className="wordmark" to="/">
          woven<span>°</span>
        </Link>
        <p>
          Handmade crochet,<br />
          made to be loved.
        </p>
      </div>
      <div className="footer-links">
        <div>
          <span>Explore</span>
          <Link to="/shop">Shop all</Link>
          <a href="/#story">Our approach</a>
        </div>
        <div>
          <span>Connect</span>
          <a href="mailto:hello@woventhread.example">Email us</a>
          <a href="/#journal">Instagram</a>
        </div>
      </div>
      <p className="copyright">© 2024 Woven Thread Co.</p>
    </footer>
  );
}
