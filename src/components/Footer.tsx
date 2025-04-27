import Icon from "../Icon/Icon";

function Footer () {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <ul className="footer__social social">
            <li className="social__item">
              <a href="#" className="social__link" aria-label="Ссылка на Вконтакте">
                <Icon id="vk-icon" className="social__link-icon"></Icon>
              </a>
            </li>
            <li className="social__item">
              <a href="#" className="social__link" aria-label="Ссылка на YouTube">
                <Icon id="youtube-icon" className="social__link-icon"></Icon>
              </a>
            </li>
            <li className="social__item">
              <a href="#" className="social__link" aria-label="Ссылка на Одноклассники">
                <Icon id="ok-icon" className="social__link-icon"></Icon>
              </a>
            </li>
            <li className="social__item">
              <a href="#" className="social__link" aria-label="Ссылка на Telegram">
                <Icon id="tg-icon" className="social__link-icon"></Icon>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;